import axios from "axios";
import { IBusiness, IProduct } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProducts() {
  try {
    const res = await axios.get(`${BASE_URL}/api/products`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function postProduct(data: IProduct) {
  try {
    const res = axios.post(`${BASE_URL}/api/products`, data);
    return { isSuccess: true, data };
  } catch (error) {
    console.log(error);
    return { isError: true, error: error };
  }
}

export async function deleteProduct(data: string) {
  try {
    const res = axios.delete(`${BASE_URL}/api/products`, { data });
    return { isSuccess: true, res };
  } catch (error) {
    console.log(error);
    return { isError: true, error: error };
  }
}

export async function getBusinesses() {
  try {
    const res = await axios.get(`${BASE_URL}/api/businesses`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function postBusiness(data: IBusiness) {
  try {
    const res = axios.post(`${BASE_URL}/api/businesses`, data);
    console.log(res);
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isError: true, error: error };
  }
}
