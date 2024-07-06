import React, { useEffect, useState } from "react";

import { cart, logo } from "../assets/index";
import { useUser } from "../contexts/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderUserDropdown from "./HeaderUserDropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useUser();
  console.log(userContext);
  const productData = useSelector((state) => state.smart.productData);
  const userInfo = useSelector((state) => state.smart.userInfo);
  console.log(userInfo);

  const [searchTerms, setSearchTerms] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search", { state: { searchTerms: searchTerms } });
    setSearchTerms("");
  };

  const totalQuantity = productData.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <div className="fixed z-50 w-full h-28 bg-white border-b-gray-200 border-b-[1px]">
        <div>
          <div className="max-w-screen-xl h-full mx-auto mt-8 mb-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
            <div className="flex items-center justify-center gap-6">
              <Link to="/">
                <img className="w-28.5 h-12" src={logo} alt="store-logo" />
              </Link>
              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="relative w-full sm:w-auto"
              >
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="border-2 border-gray-300 bg-white sm:w-80 w-55 h-10 px-5 pl-10 pr-10 rounded-full text-sm focus:outline-none hover:border-gray-400"
                  type="search"
                  name="search"
                  placeholder="Search"
                  value={searchTerms}
                  required
                  onChange={(e) => setSearchTerms(e.target.value)}
                />
              </form>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6">
              <ul className="flex items-center gap-6">
                <li
                  onClick={() => navigate("/")}
                  className="text-teal-500 hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200 hover:font-bold"
                >
                  Home
                </li>
                {user ? (
                  <HeaderUserDropdown />
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() =>
                          navigate("/signin", {
                            state: { from: location.pathname },
                          })
                        }
                        className="text-teal-500 font-bold hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200"
                      >
                        Login
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          navigate("/register", {
                            state: { from: location.pathname },
                          })
                        }
                        className="text-teal-500 font-bold hover:text-teal-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200"
                      >
                        Signup
                      </button>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/cart">
                    <div className="relative">
                      <img className="w-6" src={cart} alt="cart-image" />
                      {/* <AiOutlineShopping className="text-gray-500 text-2xl" /> */}

                      <span
                        className={`absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-bold text-teal-500 ${
                          totalQuantity > 0 ? "text-teal-600" : ""
                        }`}
                      >
                        {totalQuantity}
                      </span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="h-28"></div>
    </>
  );
};

export default Header;
