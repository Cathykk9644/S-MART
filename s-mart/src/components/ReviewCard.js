import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";

const ReviewCard = ({ review, users }) => {
  const [userName, setUserName] = useState("User not found");
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    for (let user of users) {
      if (user.id === review.userId) {
        setUserName(user.name);
        setUserPhoto(user.photo);
      }
    }
  }, []);

  return (
    <div className="flex space-x-3 py-4 border-t-[1px]">
      {userPhoto ? (
        <img
          src={userPhoto}
          alt="File not found"
          className="block h-9 w-9 rounded-full text-gray-300 border border-gray-300"
        />
      ) : (
        <BiSolidUser className="block h-[32px] w-auto rounded-full text-gray-300 border border-gray-300" />
      )}

      <div className="flex flex-col">
        <div className="flex space-x-2 items-center">
          <div className="text-gray-500 font-semibold">{userName}</div>
          <div className="text-gray-400 text-sm">Reviewed on {review.date}</div>
        </div>

        <div className="flex mt-1 text-gray-500">
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
        <div className="text-gray-500 mt-4">{review.reviewText}</div>

        {review.reviewImages && (
          <div className="flex space-x-2 mt-4">
            {review.reviewImages.map((reviewImage) => {
              return (
                <img
                  src={reviewImage}
                  alt="File not found"
                  className="block h-[80px] w-auto"
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
