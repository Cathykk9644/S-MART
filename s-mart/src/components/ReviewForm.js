import React, { useState } from "react";
import { useUser } from "../contexts/userContext";
// import { ToastContainer, toast } from "react-toastify";
import { AiFillStar, AiFillCheckCircle } from "react-icons/ai";
import { writeReviewData } from "../api/firebase-database";
import { uploadReviewImage } from "../api/firebase-storage";

const ReviewForm = ({ product }) => {
  const { user } = useUser();
  const [reviewText, setReviewText] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [reviewStars, setReviewStars] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const submitReview = async () => {
    // TODO create this function, passing review text, image, score, user id, time of post
    const images = [];
    for (let image of reviewImages) {
      images.push(await uploadReviewImage(image));
    }
    writeReviewData(user.uid, reviewText, images, reviewStars, product.title);
    setReviewText("");
    setReviewImages([]);
    setReviewStars(5);
    setSubmitted(true);
  };

  return (
    <>
      {submitted ? (
        <div className="flex flex-col items-center w-full border-y-[1px] mt-3 p-3 space-y-4">
          <h2 className="text-xl text-teal-600 font-bold">Review Submitted!</h2>
          <AiFillCheckCircle size={32} className="text-green-400" />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto my-10 flex flex-col gap-4 ">
          <h2 className="text-xl text-gray-500 font-bold mb-2 ">
            Leave a Review
          </h2>
          <div className="flex w-full space-x-8 ">
            <textarea
              className="block w-3/5 resize-none rounded-md border-0 p-1.5 text-gray-500 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-500"
              // type="text"
              rows="5"
              name="reviewText"
              placeholder="Tell us what you think"
              value={reviewText}
              required
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="flex flex-col w-2/5 space-y-4">
              <div className="flex items-center whitespace-pre text-gray-500">
                {"Score:  "}
                <AiFillStar
                  onClick={() => setReviewStars(1)}
                  className="cursor-pointer text-yellow-400"
                />
                <AiFillStar
                  onClick={() => setReviewStars(2)}
                  className={`cursor-pointer ${
                    reviewStars > 1 && "text-yellow-400"
                  }`}
                />
                <AiFillStar
                  onClick={() => setReviewStars(3)}
                  className={`cursor-pointer ${
                    reviewStars > 2 && "text-yellow-400"
                  }`}
                />
                <AiFillStar
                  onClick={() => setReviewStars(4)}
                  className={`cursor-pointer ${
                    reviewStars > 3 && "text-yellow-400"
                  }`}
                />
                <AiFillStar
                  onClick={() => setReviewStars(5)}
                  className={`cursor-pointer ${
                    reviewStars > 4 && "text-yellow-400"
                  }`}
                />
              </div>
              <div className="flex items-center whitespace-pre text-gray-500">
                {"Images:  "}
                <input
                  className="block w-3/5 cursor-pointer rounded-lg border shadow-sm file:cursor-pointer file:bg-white file:border-0 file:text-teal-600 file:hover:text-white file:hover:bg-teal-600 text-sm file:leading-7 file:px-2 text-gray-500 border-gray-300 bg-gray-200 overflow-hidden"
                  type="file"
                  multiple
                  name="reviewImages"
                  onChange={(e) => setReviewImages(e.target.files)}
                />
              </div>
              <button
                onClick={submitReview}
                className="flex w-1/3 justify-center items-center rounded-md py-1 bg-teal-500 text-sm leading-6 text-white shadow-sm hover:bg-teal-600 hover:scale-95"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewForm;
