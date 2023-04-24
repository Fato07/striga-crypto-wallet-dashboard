import IPAddressController from '@/controllers/IPAddressController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function IPAddressHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return IPAddressController(req, res);
}
