import React from "react";
import { IProduct } from "../types";

interface ICard {
  data: IProduct;
}

const Card = ({ data }: ICard) => {
  const { name, description, unit, price, discount, image, businesss } = data;
  return (
    <div className="card card-side mb-5 h-64 w-full bg-base-100 shadow-xl">
      <figure>
        <img src="https://placeimg.com/200/280/arch" alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="flex flex-wrap gap-5">
          <p>{description}</p>
          <p>{unit}</p>
          <p>{price}</p>
          <p>{discount}</p>
          <p>{businesss}</p>
        </div>
        <button className="btn-primary btn w-min ">Edit</button>
      </div>
    </div>
  );
};

export default Card;
