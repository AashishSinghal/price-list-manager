import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Businesses from "../../../models/Businesses";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log("Getting Businesses");
        const businesses = await Businesses.find({});
        // console.log(res.json());
        res.status(200).json({ success: true, data: businesses });
      } catch (error) {
        console.log("Error Getting Businesses");
        // console.log(res.json());
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log("Editing Businesses");
        const businesses = await Businesses.create(req.body);
        // console.log(res.json());
        res.status(201).json({ success: true, data: businesses });
      } catch (error) {
        console.log("Error Editing Businesses");
        // console.log(res.json());
        res.status(400).json({ success: false });
      }
      break;
    default:
      // console.log(res.json());
      res.status(400).json({ success: false });
      break;
  }
}
