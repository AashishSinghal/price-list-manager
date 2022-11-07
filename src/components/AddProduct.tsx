import React, { useState } from "react";
import axios from "axios";
import { getBusinesses, postProduct } from "../lib/apiCalls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { formValidationSchema } from "../schema";

const initialFormData = {
  name: "",
  description: "",
  unit: 0,
  price: 0,
  discount: "",
  image: "",
  business: null,
};

const AddProduct = () => {
  // Access the client
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: businesses, isLoading } = useQuery(
    ["get-businesses"],
    getBusinesses
  );

  const mutation = useMutation(postProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      // console.log("Mutation Success - ", data);
      queryClient.invalidateQueries("get-products");
    },
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    console.log(e.target.name, " - ", e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      const validatedFormData = formValidationSchema.parse(newFormData);
      console.log(validatedFormData);
      mutation.mutate(validatedFormData);
      setFormData(initialFormData);
      toggleModal();
    } catch (err) {
      console.log(err);
      alert("error");
    }
  };
  return (
    <>
      <button className="btn-primary btn" onClick={toggleModal}>
        + Add Product
      </button>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
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
          <form className="min-w-xs form-control w-full items-center">
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
                  // required
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
                  // required
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
                {isLoading ? (
                  "Loading ..."
                ) : (
                  <select
                    className="select-bordered select w-full max-w-xs"
                    name="business"
                    value={formData.business}
                    required
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Business"
                  >
                    <option disabled selected hidden>
                      Select Business
                    </option>
                    {businesses.map((b, i) => {
                      return (
                        <option key={i} value={b._id}>
                          {b.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            </div>
            <br />
            <div className="flex gap-5">
              {/* <div className="modal-action"></div> */}
              <div className="modal-action">
                <button className="btn m-3" onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
                <button className="btn m-3" onClick={toggleModal}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
