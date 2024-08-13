import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    console.log("item", item);
    const rootId = String(item.title).toLocaleLowerCase().split(" ").join("");
    navigate(`/product/${rootId}`, {
      state: {
        item: item,
      },
    });
  };

  return (
    <div className="flex flex-col px-6 py-2 border-[1px] rounded-md">
      <div className="text-gray-500 sm:text-lg font-semibold py-2 leading-6">
        Order Date: {order.date}
      </div>
      {order.orderData.map((item) => (
        <div key={item._id} className="flex w-full py-2 gap-2 sm:gap-4">
          <img
            onClick={() => handleNavigate(item)}
            className="h-14 w-14 sm:h-24 sm:w-24 object-cover rounded-sm cursor-pointer hover:scale-105 duration-300 ml-2"
            src={item.image}
            alt="productImg"
          />

          <div className="flex flex-col space-y-2">
            <div
              onClick={() => handleNavigate(item)}
              className="text-sm text-gray-500 font-semibold cursor-pointer hover:text-teal-600 hover:underline"
            >
              {item.title}
            </div>
            <div className="text-gray-400 text-sm">
              Quantity: {item.quantity}
            </div>
          </div>
          <div className="text-gray-500 ml-auto h-full my-auto pr-6 text-sm">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}
      <div className="w-full py-4 text-lg text-end text-gray-500 font-semibold leading-6 border-t-[1px] pr-6 mt-4">
        Total: ${order.totalAmt}
      </div>
    </div>
  );
};

export default OrderCard;
