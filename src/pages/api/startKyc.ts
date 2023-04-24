import startKycController from '@/controllers/startKycController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function startKycHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return startKycController(req, res);
}
