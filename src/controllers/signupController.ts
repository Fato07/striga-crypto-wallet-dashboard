import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

interface signatureOptions {
  verb: string;
  path: string;
  data: object;
}

const generateSignature = (options: signatureOptions) => {
  const { verb, path, data } = options;

  const hmac = crypto.createHmac('sha256', process.env.STRIGA_API_SECRET!);
  const time = Date.now().toString();

  hmac.update(time);
  hmac.update(verb);
  hmac.update(path);

  const contentHash = crypto.createHash('md5');
  const bodyString = JSON.stringify(data);
  contentHash.update(bodyString);

  hmac.update(contentHash.digest('hex'));

  const requestSignatureHexString = hmac.digest('hex');
  const authorizationHeader = `HMAC ${time}:${requestSignatureHexString}`;

  return authorizationHeader;
};

const createUserOnStriga = async (data: any) => {
  const options: signatureOptions = {
    verb: 'POST',
    path: '/user/create',
    data: data,
  };

  const signature = generateSignature(options);

  const config = {
    method: 'post',
    url: 'https://www.sandbox.striga.com/api/v1/user/create',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.STRIGA_API_KEY,
      Authorization: signature,
    },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios(config);

    if (response.status === 201) {
      // User created successfully
      return {
        success: true,
        data: response.data,
        message: 'User Created Successfully',
      };
    }
    console.log(response.data);
  } catch (error: any) {
    console.error(error.response.data);
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export default async function signupController(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      console.log('Request BODY', req.body);
      const result = await createUserOnStriga(req.body);
      res.send(result);
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
