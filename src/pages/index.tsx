import React, { useContext, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Results from "../components/Results";
import axios from "axios";
import ThemeSwitch from "../components/ThemeSwitch";
import AddProduct from "../components/AddProduct";
import { IProduct } from "../types";
import Card from "../components/Card";
import { getProducts, postProduct } from "../lib/apiCalls";
import { AppContext } from "../lib/AppContext";

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const { name } = useContext(AppContext);
  const [formData, setFormData] = useState<IProduct>({
    name: "",
    description: "",
    unit: 0,
    price: 0,
    discount: "",
    image: "",
    business: "",
  });
  const [addProductModalViisible, setAddProductModalViisible] = useState(false);

  useState(async () => {
    const data = await getProducts();
    console.log(name);
    setResults(data);
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
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
      <Head>
        <title>Price List Manager</title>
        <meta
          name="description"
          content="A simple price-list manager for local businesses."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <h1 className="text-3xl font-extrabold leading-normal text-gray-700 md:text-[3rem]">
          Price List Manager
        </h1>
        <div className="flex gap-5 p-2">
          <ThemeSwitch />
        </div>
        <div className="container flex items-center justify-around gap-10 p-4">
          <input
            type="text"
            autoFocus
            placeholder="Search Products..."
            value={searchText}
            onChange={(e) => handleSearch(e)}
            className="mim-w-xs input-bordered input w-full flex-1 border "
          />
          <AddProduct />
        </div>
        <br />
        {results.map((result: IProduct, i) => {
          return <Card key={i} data={result} />;
        })}
      </main>
    </>
  );
};

export default Home;
