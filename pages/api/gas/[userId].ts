import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
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
        const user = await User.findById(userId);
        const gas = new Gas(req.body);
        await gas.save();
        user.gasEntries.push(gas);
        await user.save();
        res.status(201).json({ success: true, data: gas });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
