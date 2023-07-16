import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import { MAX_GAS_ENTRIES } from '../../../lib/constants';
import Gas from "../../../models/gas.model";
import User from "../../../models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { userId } = req.query;
        const user = await User.findById(userId).populate('gasEntries');
        if (user.gasEntries.length < MAX_GAS_ENTRIES) {
          const gas = new Gas(req.body);
          await gas.save();
          user.gasEntries.push(gas);
          await user.save();
          res.status(201).json({ success: true, data: gas });
        } else {
          const gasErrorMessage = `Only ${MAX_GAS_ENTRIES} gas entries can be added.`;
          res.status(400).json({ 
            success: false, 
            errorMessage: gasErrorMessage
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
