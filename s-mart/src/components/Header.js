import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { cart, logo } from "../assets/index";
import { useUser } from "../contexts/userContext";
import { logOut } from "../api/firebase-authentication";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed z-50 w-full h-28 bg-white border-b-gray-200 border-b-[1px]">
        <div>
          <div className="max-w-screen-xl h-full mx-auto mt-8 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                onClick={() => navigate("/")}
                className="w-28.5 h-12 cursor-pointer"
                src={logo}
                alt="store-logo"
              />

              {/* Search Bar */}
              <div className="relative">
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="border-2 border-gray-300 bg-white w-80 h-10 px-5 pl-10 pr-10 rounded-full text-sm focus:outline-none hover:border-gray-500"
                  type="search"
                  name="search"
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-end gap-6">
                {user ? (
                  <div>
                    {user.displayName ? user.displayName : user.email}{" "}
                    <button onClick={async () => await logOut()}>
                      Sign Out
                    </button>
                    <button onClick={console.log(user)}>Console</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => navigate("/signin")}>Sign In</button>
                    /
                    <button onClick={() => navigate("/register")}>
                      Register
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-6">
                <ul className="flex items-center gap-6">
                  <li
                    onClick={() => navigate("/")}
                    className="text-teal-500 hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200 hover:font-bold"
                  >
                    Home
                  </li>
                  <li className="text-teal-500 font-bold hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200 ">
                    Pages
                  </li>
                  <li className="text-teal-500 font-bold hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200">
                    Shop
                  </li>
                  <li className="text-teal-500 font-bold hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200">
                    Blog
                  </li>
                </ul>
                <div className="relative">
                  <img className="w-6" src={cart} alt="cart-image" />
                  <span className="absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-28"></div>
    </>
  );
};

export default Header;
