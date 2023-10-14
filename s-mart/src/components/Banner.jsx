import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import TypingEffect from "./TypingEffect";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const data = [
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
    "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",

    "https://images.unsplash.com/photo-1486428128344-5413e434ad35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3870&q=80",
    "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3852&q=80",
  ];

  return (
    <div className="w-full h-auto overflow-hidden relative">
      {currentSlide === 0 && <TypingEffect />}
      {data.map((img, idx) => (
        <img
          key={idx}
          className={`w-screen h-full object-cover ${
            currentSlide === idx ? "block" : "hidden"
          }`}
          src={img}
          alt={`img${idx + 1}`}
        />
      ))}
      <div
        onClick={prevSlide}
        className="absolute top-1/2 left-0 ml-4 transform -translate-y-1/2 cursor-pointer"
      >
        <FaArrowCircleLeft className="sm:text-5xl text-3xl text-white hover:text-gray-600" />
      </div>
      <div
        onClick={nextSlide}
        className="absolute top-1/2 right-0 mr-4 transform -translate-y-1/2 cursor-pointer"
      >
        <FaArrowCircleRight className="sm:text-5xl text-3xl text-white hover:text-gray-600" />
      </div>

      <div className="absolute bottom-0 mb-8 w-full flex justify-center space-x-4">
        {data.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              currentSlide === idx ? "bg-gray-100" : "bg-gray-600 "
            }`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
