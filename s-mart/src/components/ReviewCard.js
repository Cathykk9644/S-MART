import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { AiFillStar } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex space-x-3 py-4 border-t-[1px]">
      <BiSolidUser
        size={32}
        className="block rounded-full text-gray-300 border border-gray-300"
      />
      <div className="flex flex-col">
        <div className="flex space-x-2 items-center">
          <div className="text-gray-700 font-semibold">Name</div>
          <div className="text-gray-400 text-sm">Reviewed on {review.date}</div>
        </div>

        <div className="flex mt-1 text-gray-700">
          <AiFillStar className="text-yellow-500" />
          <AiFillStar
            className={review.reviewStars > 1 ? "text-yellow-500" : ""}
          />
          <AiFillStar
            className={review.reviewStars > 2 ? "text-yellow-500" : ""}
          />
          <AiFillStar
            className={review.reviewStars > 3 ? "text-yellow-500" : ""}
          />
          <AiFillStar
            className={review.reviewStars > 4 ? "text-yellow-500" : ""}
          />
        </div>
        <div className="text-gray-700 mt-4">{review.reviewText}</div>

        {review.reviewImages && (
          <div className="flex space-x-2 mt-4">
            {review.reviewImages.map((reviewImage) => {
              return (
                <img
                  src={reviewImage}
                  alt="File not found"
                  className="block h-[70px] w-auto"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
