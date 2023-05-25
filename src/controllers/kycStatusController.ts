import { NextApiRequest, NextApiResponse } from 'next';
import {
  generateSignature,
  signatureOptions,
} from '../../utility/HMACsiganture';
import axios from 'axios';

const getKycStatus = async (userId: string | string[] | undefined) => {
  const options: signatureOptions = {
    verb: 'GET',
    path: `/user/kyc/${userId}`,
    data: {},
  };

  const signature = generateSignature(options);

  const config = {
    method: 'get',
    url: `https://www.sandbox.striga.com/api/v1/user/kyc/${userId}`,
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.STRIGA_API_KEY,
      Authorization: signature,
    },
    data: JSON.stringify({}),
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: `KYC Status is ${response.data}`,
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

export default async function kycStatusController(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { userId } = req.query;
      console.log('userId', userId);
      const result = await getKycStatus(userId);
      res.send(result);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
