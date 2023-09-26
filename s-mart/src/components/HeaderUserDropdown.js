import React, { useState } from "react";
import { useUser } from "../contexts/userContext";
import { logOut } from "../api/firebase-authentication";
import { useNavigate } from "react-router-dom";

const HeaderUserDropdown = () => {
  const { user } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <div className="leading-6 px-2 text-teal-500 hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] duration-200 hover:font-bold">
        {user.displayName ? user.displayName : user.email} ▼
      </div>
      {dropdownVisible && (
        <div className="absolute z-50 bg-white min-w-[120px]">
          <ul>
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left leading-8 px-2 text-teal-500 hover:text-white hover:bg-teal-500 duration-200 hover:font-bold"
              >
                My Profile
              </button>
            </li>
            <li>
              <button className="w-full text-left leading-8 px-2 text-teal-500 hover:text-white hover:bg-teal-500 duration-200 hover:font-bold">
                My Purchases
              </button>
            </li>
            <li>
              <button
                onClick={async () => await logOut()}
                className="w-full text-left leading-8 px-2 text-teal-500 hover:text-white hover:bg-teal-500 duration-200 hover:font-bold"
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
