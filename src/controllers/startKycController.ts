import { NextApiRequest, NextApiResponse } from 'next';
import {
  generateSignature,
  signatureOptions,
} from '../../utility/HMACsiganture';
import axios from 'axios';

const updateUser = async (data: any) => {
  const options: signatureOptions = {
    verb: 'PATCH',
    path: '/user/update',
    data: data,
  };

  const signature = generateSignature(options);

  const config = {
    method: 'patch',
    url: 'https://www.sandbox.striga.com/api/v1/user/update',
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
      // User Updated successfully
      return {
        success: true,
        data: response.data,
        message: `User ${response.data.userId} Updated successfully`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

const startKyc = async (data: any) => {
  const { userId } = data;

  const options: signatureOptions = {
    verb: 'POST',
    path: '/user/kyc/start',
    data: data,
  };

  const signature = generateSignature(options);

  const config = {
    method: 'post',
    url: 'https://www.sandbox.striga.com/api/v1/user/kyc/start',
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
        message: 'KYC Done',
      };
    }
    console.log(response.data);
  } catch (error: any) {
    console.error(error.response.data.errorDetails);
    return {
      success: false,
      error: error.response.data,
    };
  }
};

const simulateKyc = async (data: any) => {
  const { userId } = data;

  const obj = {
    userId: userId,
    status: 'APPROVED',
  };
  4;
  const options: signatureOptions = {
    verb: 'PATCH',
    path: '/simulate/user/kyc',
    data: obj,
  };

  const signature = generateSignature(options);

  const config = {
    method: 'patch',
    url: 'https://www.sandbox.striga.com/api/v1/simulate/user/kyc',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.STRIGA_API_KEY,
      Authorization: signature,
    },
    data: JSON.stringify(obj),
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      // User created successfully
      console.log(response);
      return {
        success: true,
        data: response.data,
        message: 'KYC Done',
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

export default async function startKycController(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const result = await simulateKyc(req.body);
      res.send(result);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
