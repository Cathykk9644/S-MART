import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { useProducts } from "../contexts/productContext";

const Home = () => {
  const { products } = useProducts();

  return (
    <div>
      <Banner />
      <Products products={products} />
    </div>
  );
};

export default Home;
