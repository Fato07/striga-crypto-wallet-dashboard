import { NextApiRequest, NextApiResponse } from 'next';
import {
  generateSignature,
  signatureOptions,
} from '../../utility/HMACsiganture';
import axios from 'axios';

const createWallet = async (data: any) => {
  const options: signatureOptions = {
    verb: 'POST',
    path: '/wallets/create',
    data: data,
  };

  const signature = generateSignature(options);

  const config = {
    method: 'POST',
    url: 'https://www.sandbox.striga.com/api/v1/wallets/create',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.STRIGA_API_KEY,
      Authorization: signature,
    },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      // User created successfully
      console.log(response.data);
      return {
        success: true,
        data: response.data,
        message: 'Wallet created successfully',
      };
    }
  } catch (error: any) {
    console.error(error.response.data.errorDetails);
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export default async function createWalletController(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      //handle post request here
      const result = await createWallet(req.body);
      res.send(result);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
