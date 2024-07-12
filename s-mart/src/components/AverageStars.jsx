import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

const AverageStars = ({ reviews }) => {
  const [avgStars, setAvgStars] = useState(5);

  useEffect(() => {
    let reviewCount = 0;
    let reviewSum = 0;
    for (let review of reviews) {
      reviewCount++;
      reviewSum += review.reviewStars;
    }
    setAvgStars(parseFloat((reviewSum / reviewCount).toFixed(1)));
  }, [reviews]);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((starNum) => (
        <div className="flex relative">
          <div
            className={`absolute overflow-hidden ${
              avgStars >= starNum
                ? ""
                : avgStars > starNum - 1
                ? `w-[${Math.round(100 * (avgStars - starNum + 1))}%]`
                : "w-[0%]"
            }`}
          >
            <AiFillStar className="text-yellow-400 bg-white" />
          </div>
          <AiFillStar className="text-gray-700" />
        </div>
      ))}
    </div>
  );
};

export default AverageStars;
