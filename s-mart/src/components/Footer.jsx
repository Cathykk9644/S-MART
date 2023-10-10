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
        <div className="text-xs sm:flex sm:gap-40">
          <div>
            <h3 className="font-bold text-2xl mb-2">S-MART</h3>
            <p>123 Fake St,</p>
            <p>Faketown, FK 12345</p>
            <p>Email: info@smart.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="font-bold text-2xl mb-2">Profile</h3>
            <p className="hover:text-gray-600 cursor-pointer">
              <AiOutlineUser className="inline-block mr-1" /> User Account
            </p>
            <p className="hover:text-gray-600 cursor-pointer">
              <AiOutlineShoppingCart className="inline-block mr-1" /> Checkout
            </p>
            <p className="hover:text-gray-600 cursor-pointer">
              <AiOutlineSearch className="inline-block mr-1" /> Order Tracking
            </p>
            <p className="hover:text-gray-600 cursor-pointer">
              <AiOutlineQuestionCircle className="inline-block mr-1" /> Help &
              Support
            </p>
          </div>
        </div>
        <div className="flex space-x-3 mt-5 sm:mt-0">
          <a
            className="hover:text-gray-600 cursor-pointer"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="h-6 w-6" />
          </a>
          <a
            className="hover:text-gray-600 cursor-pointer"
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="h-6 w-6" />
          </a>
          <a
            className="hover:text-gray-600 cursor-pointer"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            className="hover:text-gray-600 cursor-pointer"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
