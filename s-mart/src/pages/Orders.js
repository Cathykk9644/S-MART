import React, { useState, useEffect } from "react";
import { fetchOrderData } from "../api/firebase-database";
import { useUser } from "../contexts/userContext";
import { Navigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchOrderData(user.uid, (data) => {
        setOrders((orders) => [...orders, data.val()]);
      });
    }
  }, []);

  if (!user) {
    return <Navigate to="/signin" replace={true} state={{ from: "/orders" }} />;
  }

  return (
    <div>
      <img
        className="w-full h-40 object-cover opacity-80"
        src="https://images.unsplash.com/photo-1585646794748-5c6e7890f30a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2417&q=80"
        alt="cartBgImg"
      />

      <div className="max-w-screen-xl mx-auto my-auto py-8 flex flex-col">
        <h2 className="text-gray-500 text-2xl font-bold mb-4">Your Orders</h2>
        <div className="flex flex-col-reverse w-full gap-6">
          {orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
