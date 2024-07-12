import React, { useState } from "react";
import { useUser } from "../contexts/userContext";
import { logOut } from "../api/firebase-authentication";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine, RiArrowUpDownLine } from "react-icons/ri";

const HeaderUserDropdown = () => {
  const { user } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <div className="flex items-center leading-6 sm:px-2 text-teal-500 hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] duration-200 hover:font-bold ">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="File not found"
            className="object-cover h-8 w-8 rounded-full border border-gray-300 mr-2"
          />
        ) : (
          <RiArrowDropDownLine className="inline-block h-4 w-4 rounded-full text-gray-300 border border-gray-300 mr-1 text-xs sm:text-sm" />
        )}
        {"  "}
        <span className="text-sm sm:text-md">
          {user.displayName ? user.displayName : user.email}
        </span>
    
        <RiArrowDropDownLine className="sm:text-3xl text-2xl" />
      </div>
      {dropdownVisible && (
        <div className="absolute z-20 bg-white min-w-[140px] rounded-lg border-[1px]  ml-2">
          <ul>
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left leading-8 px-4 text-gray-400 hover:text-white hover:bg-teal-500 duration-200 hover:font-bold text-sm"
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/orders")}
                className="text-sm w-full text-left leading-8 px-4 text-gray-400 hover:text-white hover:bg-teal-500 duration-200 hover:font-bold"
              >
                My Orders
              </button>
            </li>
            <li>
              <button
                onClick={async () => await logOut()}
                className=" text-sm w-full text-left leading-8 px-4 text-gray-400 hover:text-white hover:bg-teal-500 duration-200 hover:font-bold"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderUserDropdown;
