import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Results from "../components/Results";

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [addProductModalViisible, setAddProductModalViisible] = useState(false);

  const handleSearch = () => {};

  const handleModalToggle = () => {};

  return (
    <>
      <Head>
        <title>Price List Manager</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <h1 className="text-3xl font-extrabold leading-normal text-gray-700 md:text-[3rem]">
          Price List Manager
        </h1>
        <div className="container flex items-center justify-between p-4">
          <input
            type="text"
            autoFocus
            className="border-1 mr-2 flex-1 rounded-sm border-blue-400 p-4"
            placeholder="Search Products..."
            value={searchText}
            onChange={handleSearch}
          />
          <button
            className="rounded-sm border-blue-400 bg-blue-400 p-4 text-white"
            type="button"
            onClick={handleModalToggle}
          >
            + Add Product
          </button>
        </div>
        <br />
        <Results searchText={""} />
      </main>
    </>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};