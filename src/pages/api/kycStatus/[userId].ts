import kycStatusController from '@/controllers/kycStatusController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function kycStatusHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return kycStatusController(req, res);
}
