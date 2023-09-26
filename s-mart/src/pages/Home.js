import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { productsData } from "../api/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productsData();
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Banner />
      <Products products={products} />
    </div>
  );
};

export default Home;
