import { NextApiRequest, NextApiResponse } from "next";

export default function loginController(
 req: NextApiRequest,
 res: NextApiResponse,
) {
 const { method } = req;

 switch (method) {
   case 'POST':
    //handle post request here
   default:
     res.setHeader('Allow', ['POST']);
     res.status(405).end(`Method ${method} Not Allowed`);
 }
}
