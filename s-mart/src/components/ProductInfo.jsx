import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AverageStars from "./AverageStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/smartSlice";
import { ToastContainer, toast } from "react-toastify";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { fetchReviewData, fetchUserData } from "../api/firebase-database";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Initial check for required state
  const details = location.state?.item;

  const [baseQty, setBaseQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!details) {
      toast.error("Product information is missing.");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    window.scrollTo(0, 0);
    fetchReviewData(details.title, (data) => {
      setReviews((reviews) => [...reviews, data.val()]);
    });
    fetchUserData((data) => {
      setUsers((users) => [...users, data.val()]);
    });
  }, [details, navigate]);

  if (!details) {
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto sm:my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:gap-10 my-10">
        {/* Product Image */}
        <div className="w-full sm:w-2/5">
          <img
            className="w-full h-auto sm:h-[550px] object-cover rounded-sm"
            src={details.image}
            alt="product image"
          />
          <div className="absolute top-6 right-0">
            {details.isNew && (
              <p className="bg-teal-600 text-white font-semibold px-8 py-1 rounded-sm">
                Sale
              </p>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full sm:w-3/5 flex flex-col justify-center gap-4 sm:gap-10">
          <h2 className="text-xl sm:text-4xl text-gray-500 font-semibold">
            {details.title}
          </h2>
          <div className="flex items-center gap-4">
            <p className="line-through text-gray-400">${details.oldPrice}</p>
            <p className="text-2xl text-gray-700 font-bold">${details.price}</p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <p className="text-gray-700">Score:</p>
            <AverageStars reviews={reviews} />
            <p className="text-xs text-gray-400">({reviews.length} reviews)</p>
          </div>
          <p className="text-xs sm:mt-3 text-gray-500">{details.description}</p>
          <div className="flex gap-8">
            {/* Quantity and Add to Cart Button */}

            <div className="sm:w-52 flex items-center justify-between text-gray-500 gap-4 border p-3 sm:p-4 rounded-md">
              <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                Quantity
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-semibold">
                <button
                  onClick={() => setBaseQty(baseQty === 1 ? 1 : baseQty - 1)}
                  className="hover:bg-gray-600 hover:text-white cursor-pointer duration-300 border h-5 font-normal text-lg flex items-center justify-center px-2 rounded-md"
                >
                  -
                </button>
                <span className="text-xs">{baseQty}</span>
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
                className="bg-teal-500 rounded-md text-white p-2 sm:py-3 sm:px-6 hover:scale-95 text-sm"
              >
                Add to cart
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Category: <span className="font-medium">{details.category}</span>
          </p>
        </div>
      </div>

      {/* Review Section */}
      <div>
        <ReviewForm product={details} />
        <div className="flex flex-col-reverse w-full">
          {reviews.map((review) => (
            <ReviewCard review={review} users={users} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Link to="/">
          <button className="text-gray-500 hover:text-gray-700 duration-300 cursor-pointer  border-[1px] p-3 rounded-lg hover:scale-95 text-sm my-4">
            Back to Shopping
          </button>
        </Link>
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
