import React from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const data = useLoaderData();
  console.log(data.data);

  useEffect(() => {
    setProducts(data.data);
  }, [data]);

  return (
    <div>
      <Banner />
      <Products products={products} />
    </div>
  );
};

export default Home;
