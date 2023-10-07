import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  resetCart,
} from "../redux/smartSlice";
import { Link } from "react-router-dom";

const CartItems = () => {
  const productData = useSelector((state) => state.smart.productData);
  const dispatch = useDispatch();

  // Check if cart is empty
  const isEmpty = productData.length === 0;

  return (
    <div className="w-2/3 pr-10 text-gray-500">
      <div className="w-full">
        <h2 className="text-2xl">Shopping Cart</h2>
      </div>
      <div>
        {isEmpty ? (
          <div>
            <p className="text-base  mt-6">
              Your cart is currently empty, go explore!
            </p>
            <Link to="/">
              <button className="text-white bg-teal-500 mt-6 hover:bg-teal-600 duration-300 cursor-pointer  border-[1px] p-3 rounded-lg hover:scale-95 text-base">
                Start shopping now!
              </button>
            </Link>
          </div>
        ) : (
          productData.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 mt-6"
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-28 h-28 object-cover rounded-sm"
                  src={item.image}
                  alt="productImg"
                />
              </div>
              <h2 className="w-48">{item.title}</h2>
              <p className="w-8">${item.price}</p>

              {/*  quantity area */}
              <div className="flex gap-3">
                <p className="text-sm text-gray-600 font-semibold">Quant:</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-semibold">
                  <button
                    onClick={() =>
                      dispatch(
                        decrementQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                          description: item.description,
                        })
                      )
                    }
                    className="hover:bg-gray-600 hover:text-white cursor-pointer duration-300 border h-5 font-normal text-lg flex items-center justify-center px-2 rounded-md"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        incrementQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                          description: item.description,
                        })
                      )
                    }
                    className="hover:bg-gray-600 hover:text-white cursor-pointer duration-300 border h-5 font-normal text-lg flex items-center justify-center px-2 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <p className="w-10">${item.quantity * item.price}</p>
              </div>
              <div>
                <MdOutlineClose
                  onClick={() => dispatch(deleteItem(item._id))}
                  className="text-xl font-bold hover:text-teal-600 cursor-pointer duration-300"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {!isEmpty && (
        <>
          <button
            onClick={() => dispatch(resetCart())}
            className="bg-teal-500 text-white mt-8  py-1 px-6 hover:bg-teal-600 duration-300 rounded-md "
          >
            Clear cart
          </button>

          <Link to="/">
            <button className="text-gray-500 hover:text-gray-700 duration-300 cursor-pointer ml-8 border-[1px] p-2 rounded-lg hover:scale-95 text-sm">
              More shopping
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartItems;
