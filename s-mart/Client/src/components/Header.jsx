import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { cart, logo } from "../assets/index";
import { useUser } from "../contexts/userContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HeaderUserDropdown from "./HeaderUserDropdown";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useUser();

  const productData = useSelector((state) => state.smart.productData);
  const userInfo = useSelector((state) => state.smart.userInfo);

  const [searchTerms, setSearchTerms] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="fixed z-50 w-full h-auto sm:h-28 bg-white border-b-gray-200 sm:border-b-[1px]">
        <div className="mx-2">
          <div className="max-w-screen-xl h-full mx-auto mt-8 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/">
                <img
                  className="sm:w-28 sm:h-12 w-18 h-6"
                  src={logo}
                  alt="store-logo"
                />
              </Link>
              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="relative w-full sm:w-auto"
              >
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  className="border sm:border-2 border-gray-300 bg-white sm:w-80 w-50 h-7 sm:h-10 px-5 pl-8 pr-10 rounded-full text-xs sm:text-sm focus:outline-none hover:border-gray-400"
                  type="search"
                  name="search"
                  placeholder="Search"
                  value={searchTerms}
                  required
                  onChange={(e) => setSearchTerms(e.target.value)}
                />
              </form>
            </div>
            <div className="sm:hidden">
              <button
                className="text-2xl text-gray-500"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <ul className="flex items-center gap-6">
                <li
                  onClick={() => navigate("/")}
                  className="text-teal-500 hover:text-teal-700 hover:scale-90 underline-offset-2 decoration-[1px] cursor-pointer duration-200 hover:font-bold text-xs sm:text-sm"
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
                        className="text-teal-500 font-bold hover:text-teal-700 hover:scale-90 underline-offset-2 decoration-[1px] cursor-pointer duration-200 text-xs sm:text-sm"
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
                        className="text-teal-500 font-bold hover:text-teal-700 hover:scale-90 underline-offset-2 decoration-[1px] cursor-pointer duration-200 text-xs sm:text-sm"
                      >
                        Signup
                      </button>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/cart">
                    <div className="relative hover:scale-90 ">
                      <img className="w-4 sm:w-6" src={cart} alt="cart-image" />
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
          {/* Hamburger Menu */}
          {menuOpen && (
            <div className="sm:hidden flex flex-col gap-4 px-2 py-4 bg-slate-50 items-start">
              <ul className="flex flex-col gap-4 ml-2">
                <li
                  onClick={() => {
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="text-teal-500 hover:text-teal-700 hover:scale-90 underline-offset-2 decoration-[1px] cursor-pointer duration-200 hover:font-bold text-sm"
                >
                  Home
                </li>
                {user ? (
                  <HeaderUserDropdown />
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/signin", {
                            state: { from: location.pathname },
                          });
                          setMenuOpen(false);
                        }}
                        className="text-teal-500 font-bold hover:text-teal-700 hover:scale-90 underline-offset-2 decoration-[1px] cursor-pointer duration-200 text-sm"
                      >
                        Login
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/register", {
                            state: { from: location.pathname },
                          });
                          setMenuOpen(false);
                        }}
                        className="text-teal-500 font-bold hover:text-teal-700 hover:scale-90 underline-offset-2 decoration-[1px] cursor-pointer duration-200 text-sm"
                      >
                        Signup
                      </button>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/cart" onClick={() => setMenuOpen(false)}>
                    <div className="relative hover:scale-90">
                      <img className="w-6" src={cart} alt="cart-image" />
                      <span
                        className={`absolute  w-6 top-2 left-0 text-sm hover:text-teal-700 flex items-center justify-center font-bold text-teal-500 ${
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
          )}
        </div>
      </div>
      {/* <div className="h-28"></div> */}
    </>
  );
};

export default Header;
