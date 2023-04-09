import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct } from "../lib/apiCalls";
import { IProduct } from "../types";

interface ICard {
  data: IProduct;
}

const Card = ({ data }: ICard) => {
  // Access the client
  const queryClient = useQueryClient();

  const { name, description, unit, price, discount, image, business, _id } =
    data;

  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      // console.log("Mutation Success - ", data);
      queryClient.invalidateQueries("get-products");
    },
  });

  const handleDeleteProduct = () => {
    console.log("ID - ", _id);
    mutation.mutate(_id);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={image[0] || "https://placeimg.com/200/280/arch"}
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Product Name - {name}</h2>
        <div className="flex flex-wrap gap-5">
          <p>{description}</p>
          <p>{unit}</p>
          <p>{price}</p>
          <p>{discount}</p>
          <p>{business}</p>
        </div>
        <div className="mt-auto flex flex-row gap-5">
          <button className="btn-primary btn w-min ">Edit</button>
          <button
            className="btn-primary btn w-min"
            onClick={handleDeleteProduct}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
