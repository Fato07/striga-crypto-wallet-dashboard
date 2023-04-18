import type { NextApiRequest, NextApiResponse } from 'next'
import loginController from '../../controllers/loginController';

type Data = {
  name: string
}

export default function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return loginController(req, res)
}
