import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import { MAX_USERS, TEXT_LENGTH } from "../../../lib/constants";
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
        if (users.length < MAX_USERS) {
          const { firstName, lastName, email } = req.body;
          if (!firstName || !lastName || !email) {
            throw new Error("Missing information.");
          }
          if (
            typeof firstName !== "string" ||
            typeof lastName !== "string" ||
            typeof email !== "string"
          ) {
            throw new Error("Incorrect data type.");
          }
          if (
            firstName.length > TEXT_LENGTH ||
            lastName.length > TEXT_LENGTH ||
            email.length > TEXT_LENGTH
          ) {
            throw new Error("Data size exceeds limits.");
          }
          const user = await User.create({
            firstName,
            lastName,
            email
          });
          res.status(201).json({ success: true, data: user });
        } else {
          const userErrorMessage = `There are ${users.length} users. Only ${MAX_USERS} users can be created.`;
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
