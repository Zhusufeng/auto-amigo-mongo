import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId } = req.query;
        const user = await User.findById(userId).populate("gasEntries");
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ 
          success: false, 
          errorMessage: String(error),
        });
      }
      break;
    default:
      const defaultErrorMessage = `Invalid method (${method}).`;
      res.status(400).json({ 
        success: false, 
        errorMessage: defaultErrorMessage,  
      });
      break;
  }
}
