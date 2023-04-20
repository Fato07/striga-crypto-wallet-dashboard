import signupController from '@/controllers/signupController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return signupController(req, res);
}
