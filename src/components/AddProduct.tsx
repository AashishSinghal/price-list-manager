import React, { useState } from "react";
import axios from "axios";
import { postProduct } from "../lib/apiCalls";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unit: 0,
    price: 0,
    discount: "",
    image: "",
    business: "",
  });
  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await postProduct(formData);
  };
  return (
    <>
      <label htmlFor="my-modal" className="btn">
        + Add Product
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-11/12 max-w-5xl">
          <label
            htmlFor="my-modal"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Fill Product details</h3>
          <p className="py-4">
            You&apos;ve been selected for a chance to get one year of
            subscription to use Wikipedia for free!
          </p>
          <form
            className="min-w-xs form-control w-full items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex w-full flex-wrap">
              <div className="m-3 flex flex-col">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Name"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>
              <div className="m-3 flex flex-col">
                <label className="label">
                  <span className="label-text">Product Description</span>
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  value={formData.description}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Description"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>
              <div className="m-3 flex flex-col">
                <label className="label">
                  <span className="label-text">Unit</span>
                </label>
                <input
                  type="number"
                  name="unit"
                  required
                  value={formData.unit}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Unit"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>
              <div className="m-3 flex flex-col">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Price"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>
              <div className="m-3 flex flex-col">
                <label className="label">
                  <span className="label-text">Discount</span>
                </label>
                <input
                  type="text"
                  name="discount"
                  required
                  value={formData.discount}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Discount"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>
              <div className="m-3 flex flex-col">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="text"
                  name="image"
                  required
                  value={formData.image}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Image"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>
              <div className="m-3 flex flex-col">
                <label className="label">
                  <span className="label-text">Business</span>
                </label>
                <input
                  type="text"
                  name="business"
                  required
                  value={formData.business}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Business"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>
            </div>
            <br />
            <div className="flex gap-5">
              <button className="btn mt-6" type="submit">
                Submit
              </button>
              <div className="modal-action">
                <label htmlFor="my-modal" className="btn">
                  Cancel
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
