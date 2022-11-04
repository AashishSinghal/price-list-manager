import { Schema, model, models } from "mongoose";

const BusinessesSchema = new Schema({
  name: String,
});

const Businesses =
  models.Businesses || model("Businesses", BusinessesSchema, "Businesses");

export default Businesses;
