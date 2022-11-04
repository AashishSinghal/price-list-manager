import dbConnect from "../../../lib/dbConnect";
import Products from "../../../models/Products";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log("Getting Prodcuts");
        const products = await Products.find({});
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        console.log("Error Getting Prodcuts");
        // console.log(res.json());
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log("Editing Prodcuts - ", req.body);
        const products = await Products.create(req.body);
        // console.log(res.json());
        res.status(201).json({ success: true, data: products });
      } catch (error) {
        console.log("Error Editing Prodcuts");
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
