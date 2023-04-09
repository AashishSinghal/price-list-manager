export type IProduct = {
  _id?: string;
  name: string;
  description: string;
  unit: string | null;
  price: string | null;
  discount: string | null;
  image: string[];
  business: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IBusiness = {
  name: string;
};
