import React, { useState, useEffect } from "react";
import { useProducts } from "../contexts/productContext";
import { useLocation } from "react-router-dom";
import Products from "../components/Products";

const Search = () => {
  const { products } = useProducts();
  const location = useLocation();
  const { searchTerms } = location.state || "";

  const searchResults = [];
  for (let product of products) {
    if (product.title.toLowerCase().includes(searchTerms.toLowerCase())) {
      searchResults.push(product);
    }
  }

  return (
    <div className="mt-12 sm:mt-20">
      <Products products={searchResults} />
    </div>
  );
};

export default Search;
