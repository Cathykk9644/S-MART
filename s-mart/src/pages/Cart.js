import React, { useEffect, useState } from "react";
import CartItems from "../components/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/smartSlice";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useUser } from "../contexts/userContext";
import { writeOrderData } from "../api/firebase-database";

const Cart = () => {
  const productData = useSelector((state) => state.smart.productData);
  // const userInfo = useSelector((state) => state.smart.userInfo);
  const { user } = useUser();
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState("");
  const [payNow, setPayNow] = useState(false);

  // Check if cart is empty
  const isEmpty = productData.length === 0;

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    console.log(user);
    if (user) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  const payment = async (token) => {
    await axios
      .post("http://localhost:8000/pay", {
        amount: totalAmt * 100,
        token: token,
      })
      .then(console.log("payment success", productData))
      .then(writeOrderData(user.uid, productData, totalAmt))
      .then(dispatch(resetCart()))
      .then(toast.success("Order placed!"))
      .catch((error) => {
        console.log("Payment Error:", error);
      });
  };

  return (
    <div>
      <img
        className="w-full h-40 sm:h-60 object-cover opacity-80"
        src="https://images.unsplash.com/photo-1585646794748-5c6e7890f30a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2417&q=80"
        alt="cartBgImg"
      />

      <div className="max-w-screen-xl mx-auto my-auto py-6 flex flex-col sm:flex-row">
        <CartItems />

        {!isEmpty && (
          <div className="w-full sm:w-1/3 bg-[#f6f8f8] py-6 px-4 rounded-lg mt-4 ">
            <div className="flex flex-col gap-4 border-b-[1px] border-b-gray-300 pb-6">
              <h2 className="text-lg sm:text-2xl font-medium text-gray-500">
                Order Summary
              </h2>
              <p className="flex items-center gap-4 text-gray-500">
                Subtotal{" "}
                <span className="font-bold sm:text-lg">${totalAmt}</span>
              </p>
              <p className="flex items-center gap-4 text-gray-500">
                Shipping{" "}
                <span className="text-xs">
                  Lorem onsectetur adipisicinor sit, amet consectetur
                  adipisicing elit. Providdsfdent. Onsectetur adipisicin,
                  onsectetur adipisicin sdfddsdfwsdffs.
                </span>
              </p>
            </div>
            <p className="font-semibold flex justify-between mt-6 text-xl text-gray-500">
              Total <span className="font-bold">${totalAmt}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="bg-teal-500 text-white rounded-md w-full py-3 mt-6 hover:bg-teal-600"
            >
              Proceed to checkout
            </button>

            {/* Stripe Checkout Section */}
            {payNow && (
              <div className="w-full mt-8 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51Nq6BiExlPtuQZMFszfMDaJ1VGTTfZrpUBH8RoxZmlrZr7lgPD73CT5r93xrKLrZGCW9HHT13QvY8GYRewtYG8Pe00NLD3BuVp"
                  name="S-MART Online Store"
                  amount={totalAmt * 100}
                  label="Pay to S-MART"
                  description={`Your payment is $${totalAmt} in total`}
                  token={payment}
                  email={user && user.email}
                />
              </div>
            )}
          </div>
        )}
      </div>

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
        theme="dark"
      />
    </div>
  );
};

export default Cart;
