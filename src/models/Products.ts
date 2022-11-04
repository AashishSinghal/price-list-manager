import { Schema, model, models } from "mongoose";

const ProductsSchema = new Schema({
  name: String,
  description: String,
  unit: Number,
  price: Number,
  discount: String,
  image: "",
  business: "",
  createdOn: Date,
  updatedOn: Date,
});

const Products =
  models.Products ||
  model("Products", ProductsSchema, "Products");

export default Products;
