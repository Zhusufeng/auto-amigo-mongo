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
        const user = await User.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ 
          success: false,
          errorMessage: String(error),
        });
      }
      break;
    case "POST":
      try {
        const users = await User.find({});
        const MAX_USERS = 7;
        if (users.length < MAX_USERS) {
          const user = await User.create(req.body);
          res.status(201).json({ success: true, data: user });
        } else {
          const userErrorMessage = `Only ${MAX_USERS} users can be created.`;
          res.status(400).json({ 
            success: false, 
            errorMessage: userErrorMessage,
          });
        }
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
