import React from "react";
import ProductCard from "./ProductCard";

const Products = ({ products }) => {
  // console.log(products);
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="sm:text-2xl text-md bg-teal-500 text-white py-2 sm:w-80 w-60 text-center rounded-full font-semibold hover:bg-teal-600 cursor-pointer sm:mt-6 mt-2">
          Shop with S-MART
        </h1>
        <p className="max-w-[600px] text-gray-400 text-center text-sm mt-6">
          Experience the future of online shopping with S-MART. From trendy
          apparel to the latest gadgets, we've got everything you need and more.
          With S-MART, quality and convenience are just a click away.
          <span className="font-bold text-teal-600">
            Shop smart, choose S-MART!
          </span>
        </p>
      </div>
      <div className="max-w-screen-xl mx-auto py-10 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
