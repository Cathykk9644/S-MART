import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { cart, logo } from "../assets/index";
import { useUser } from "../contexts/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderUserDropdown from "./HeaderUserDropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useUser();
  console.log(userContext);
  // selector function is (state) => state.smart.productData, which means that productData will be an array that comes from state.smart.productData in your Redux store.
  const productData = useSelector((state) => state.smart.productData);
  const userInfo = useSelector((state) => state.smart.userInfo);
  console.log(userInfo);

  const [searchTerms, setSearchTerms] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search", { state: { searchTerms: searchTerms } });
    setSearchTerms("");
  };

  return (
    <>
      <div className="fixed z-50 w-full h-28 bg-white border-b-gray-200 border-b-[1px]">
        <div>
          <div className="max-w-screen-xl h-full mx-auto mt-8 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/">
                <img className="w-28.5 h-12" src={logo} alt="store-logo" />
              </Link>
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative">
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="border-2 border-gray-300 bg-white w-80 h-10 px-5 pl-10 pr-10 rounded-full text-sm focus:outline-none hover:border-gray-500"
                  type="search"
                  name="search"
                  placeholder="Search"
                  value={searchTerms}
                  required
                  onChange={(e) => setSearchTerms(e.target.value)}
                />
              </form>
            </div>

            <div className="flex flex-col ">
              <div className="flex justify-end mb-3">
                {user ? (
                  <HeaderUserDropdown />
                ) : (
                  <div className="text-teal-500">
                    <button
                      onClick={() =>
                        navigate("/signin", {
                          state: { from: location.pathname },
                        })
                      }
                      className="text-teal-500 font-bold hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200"
                    >
                      Sign In
                    </button>
                    {" | "}
                    <button
                      onClick={() =>
                        navigate("/register", {
                          state: { from: location.pathname },
                        })
                      }
                      className="text-teal-500 font-bold hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200"
                    >
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
                <Link to="/cart">
                  <div className="relative">
                    <img className="w-6" src={cart} alt="cart-image" />
                    <span
                      className={`absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-bold ${
                        productData.length > 0 ? "text-teal-600" : ""
                      }`}
                    >
                      {productData.length}
                    </span>
                  </div>
                </Link>
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
