import axios from "axios";
import { IBusiness, IProduct } from "../types";

export async function getProducts() {
  try {
    const res = await axios.get(`http://localhost:3000/api/products`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function postProduct(data: IProduct) {
  try {
    const res = axios.post(`http://localhost:3000/api/products`, data);
    console.log(res);
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isError: true, error: error };
  }
}

export async function getBusinesses() {
  try {
    const res = await axios.get(`http://localhost:3000/api/businesses`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function postBusiness(data: IBusiness) {
  try {
    const res = axios.post(`http://localhost:3000/api/businesses`, data);
    console.log(res);
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isError: true, error: error };
  }
}
