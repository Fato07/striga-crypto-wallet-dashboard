import signupController from '@/controllers/signupController'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return signupController(req, res)
}
