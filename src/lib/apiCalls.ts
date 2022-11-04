import axios from "axios";
import { IBusiness, IProduct } from "../types";

const BASE_URL = process.env.BASE_URL;

export async function getProducts() {
  try {
    const res = await axios.get(`/api/products`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function postProduct(data: IProduct) {
  try {
    const res = axios.post(`/api/products`, data);
    console.log(res);
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isError: true, error: error };
  }
}

export async function getBusinesses() {
  try {
    const res = await axios.get(`/api/businesses`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function postBusiness(data: IBusiness) {
  try {
    const res = axios.post(`/api/businesses`, data);
    console.log(res);
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isError: true, error: error };
  }
}
