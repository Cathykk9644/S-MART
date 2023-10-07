import { createContext, useContext, useState, useEffect } from "react";
import { productsData } from "../api/api";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);

  const state = {
    products,
  };

  const fetchData = async () => {
    try {
      const result = await productsData();
      setProducts(result.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={state}>
      {props.children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
