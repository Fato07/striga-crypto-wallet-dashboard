import createWalletController from '@/controllers/createWalletController';
import { NextApiRequest, NextApiResponse } from 'next';

export default function createWalletHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return createWalletController(req, res);
}
