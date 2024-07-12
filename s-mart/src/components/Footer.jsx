import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-teal-500 text-white px-10 py-10 relative">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-xs sm:flex flex wrap sm:gap-40">
          <div>
            <h3 className="font-bold sm:text-2xl text-lg mb-2 mx-0">S-MART</h3>
            <p className="text-[10px]">123 Fake St,</p>
            <p className="text-[10px]">Faketown, FK 12345</p>
            <p className="text-[10px]">Email: info@smart.com</p>
            <p className="text-[10px]">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="font-bold sm:text-2xl text-lg mb-2">Profile</h3>
            <p className="hover:text-gray-600 cursor-pointer text-[10px]">
              <AiOutlineUser className="inline-block mr-1" /> User Account
            </p>
            <p className="hover:text-gray-600 cursor-pointer text-[10px]">
              <AiOutlineShoppingCart className="inline-block mr-1" /> Checkout
            </p>
            <p className="hover:text-gray-600 cursor-pointer text-[10px]">
              <AiOutlineSearch className="inline-block mr-1" /> Order Tracking
            </p>
            <p className="hover:text-gray-600 cursor-pointer text-[10px]">
              <AiOutlineQuestionCircle className="inline-block mr-1" /> Help &
              Support
            </p>
          </div>
        </div>
        <div className="flex space-x-3 mt-5 ">
          <a
            className="hover:text-gray-600 cursor-pointer"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="sm:h-6 sm:w-6" />
          </a>
          <a
            className="hover:text-gray-600 cursor-pointer"
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="sm:h-6 sm:w-6" />
          </a>
          <a
            className="hover:text-gray-600 cursor-pointer"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="sm:h-6 sm:w-6" />
          </a>
          <a
            className="hover:text-gray-600 cursor-pointer"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
