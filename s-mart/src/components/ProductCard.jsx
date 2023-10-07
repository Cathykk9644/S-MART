import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/smartSlice";
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create individual route id for each product page based on product title
  const _id = product.title;
  const idString = (_id) => {
    return String(_id).toLocaleLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  console.log(rootId);

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };
  return (
    <div className="group relative flex flex-col ">
      <div
        onClick={handleDetails}
        className="w-full h-96 cursor-pointer overflow-hidden rounded-sm"
      >
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
          <div className="flex gap-2">
            <p className="line-through text-gray-400">${product.oldPrice}</p>
            <p className="text-gray-700 font-bold">${product.price}</p>
          </div>
        </div>
        <div className="absolute top-6 right-0">
          {product.isNew && (
            <p className="bg-teal-600 text-white font-semibold px-5 py-1 rounded-sm">
              Sale
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: product._id,
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: 1,
              description: product.description,
            })
          ) && toast.success(`${product.title} is added`)
        }
        className="w-full p-2 bg-teal-500 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Add to cart
      </button>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ProductCard;
