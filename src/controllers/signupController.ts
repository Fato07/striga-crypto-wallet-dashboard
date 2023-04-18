import { NextApiRequest, NextApiResponse } from "next";

export default function signupController(
 req: NextApiRequest,
 res: NextApiResponse,
) {
 const { method } = req;

 switch (method) {
   case 'POST':
    //handle post request here
   // Your signup logic here, e.g., call the Striga API and process the response
   res.status(200).json({ name: 'John Doe' });
   
   default:
     res.setHeader('Allow', ['POST']);
     res.status(405).end(`Method ${method} Not Allowed`);
 }
}
