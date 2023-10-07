import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/smartSlice";
import { ToastContainer, toast } from "react-toastify";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { fetchReviewData } from "../api/firebase-database";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const details = location.state.item;
  // const [details, setDetails] = useState({});
  const [baseQty, setBaseQty] = useState(1);
  // useEffect(() => {
  //   setDetails(location.state.item);
  // }, []);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log("effect run");
    fetchReviewData(details.title, (data) => {
      setReviews((reviews) => [...reviews, data.val()]);
      console.log(data.val());
    });
  }, []);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto my-10 flex flex-col gap-4">
        <div className="flex w-full gap-10">
          <div className="w-2/5 relative">
            <img
              className="w-full h-[550px] object-cover rounded-sm"
              src={details.image}
              alt="productImg"
            />
            <div className="absolute top-6 right-0">
              {details.isNew && (
                <p className="bg-teal-600 text-white font-semibold px-8 py-1 rounded-sm">
                  Sale
                </p>
              )}
            </div>
          </div>
          <div className="w-3/5 flex flex-col justify-center gap-10">
            <div>
              <h2 className="text-4xl text-gray-500 font-semibold">
                {details.title}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="line-through text-gray-400">${details.oldPrice}</p>
              <p className="text-gray-700 text-2xl font-bold">
                ${details.price}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-gray-600">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <p className="text-xs text-gray-400">(14 customer review)</p>
            </div>
            <p className="text-gray-500 mt-3">{details.description}</p>
            <div className="flex gap-8">
              <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-4 rounded-md">
                <p className="text-sm text-gray-600 font-semibold">Quantity</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-semibold">
                  <button
                    onClick={() => setBaseQty(baseQty === 1 ? 1 : baseQty - 1)}
                    className="hover:bg-gray-600 hover:text-white cursor-pointer duration-300 border h-5 font-normal text-lg flex items-center justify-center px-2 rounded-md"
                  >
                    -
                  </button>
                  <span>{baseQty}</span>
                  <button
                    onClick={() => setBaseQty(baseQty + 1)}
                    className="hover:bg-gray-600 hover:text-white cursor-pointer duration-300 border h-5 font-normal text-lg flex items-center justify-center px-2 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: details._id,
                        title: details.title,
                        image: details.image,
                        price: details.price,
                        quantity: baseQty,
                        description: details.description,
                      })
                    ) && toast.success(`${details.title} is added`)
                  }
                  className="bg-teal-500 rounded-md text-white py-3 px-6 hover:scale-95"
                >
                  Add to cart
                </button>
              </div>
            </div>
            <p className="text-gray-500">
              Category:{" "}
              <span className="font-medium capitalize">{details.category}</span>
            </p>
          </div>
        </div>
        <ReviewForm product={details} />
        <div className="flex flex-col-reverse w-full">
          {reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
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
        theme="light"
      />
    </div>
  );
};

export default ProductInfo;
