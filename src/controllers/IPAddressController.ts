import { NextApiRequest, NextApiResponse } from 'next';

const getIpAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch IP address:', error);
    return error;
  }
};

export default async function IPAddressController(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const result = await getIpAddress();
      res.status(200).json(result);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
