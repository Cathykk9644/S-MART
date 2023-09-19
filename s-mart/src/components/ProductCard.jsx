import React from "react";

// props passed from ProductCard component for 20 products fetched

const ProductCard = ({ product }) => {
  return (
    <div className="group">
      <div className="w-full h-96 cursor-pointer overflow-hidden rounded-sm">
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-300"
          src={product.image}
          alt="productImg"
        />
      </div>
      <div className="w-full border-[1px] px-2 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold text-gray-500">{product.title}</h2>
          </div>
          <div className="flex gap-2 ">
            <p className="line-through text-gray-400">${product.oldPrice}</p>
            <p className="text-gray-700 font-bold">${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
