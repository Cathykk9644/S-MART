import React, { useState } from "react";
import { register } from "../api/firebase-authentication";
import { useNavigate, useLocation } from "react-router-dom";
import { editUserData } from "../api/firebase-database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      state.email &&
      state.password &&
      state.password === state.confirmPassword
    ) {
      const user = await register(state.email, state.password);
      if (user) {
        editUserData(user);
        setState({
          email: "",
          password: "",
          confirmPassword: "",
        });
        toast.success("Registration successful! You can now log in.");
        setTimeout(
          () =>
            navigate(from === "/register" || from === "/signin" ? "/" : from),
          3000
        );
      }
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-[70vh] justify-center items-center">
      <div className="flex flex-col items-center justify-start h-full sm:max-w-sm w-2/3 sm:w-full">
        <h2 className="mt-24 sm:mt-44 sm:text-2xl font-bold text-gray-500">
          Let's start from here!
        </h2>

        <form
          className="flex flex-col items-center justify-center w-full mt-4 sm:mt-12 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="w-full text-sm">
            <label className="block text-gray-500">Email</label>
            <input
              className="block w-full mt-2 rounded-md border-0 p-2 text-gray-500 text-[10px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-500"
              type="text"
              name="email"
              placeholder="Your Email"
              value={state.email}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="w-full text-sm">
            <label
              className="
        text-gray-500"
            >
              Password
            </label>
            <input
              className="block w-full mt-2 rounded-md border-0 p-2 text-gray-500 text-[10px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-500"
              type="password"
              name="password"
              placeholder="Your Password"
              value={state.password}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="w-full text-sm">
            <div className="flex items-center justify-between">
              <label className="text-gray-500">Password Again</label>
              {state.password === state.confirmPassword ? (
                <br />
              ) : (
                <div className="text-sm text-red-800 leading-6">
                  Passwords must match
                </div>
              )}
            </div>

            <input
              className="block w-full mt-2 rounded-md border-0 p-2 text-gray-500 text-[10px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-500"
              type="password"
              name="confirmPassword"
              placeholder="Your Password Again"
              value={state.confirmPassword}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <input
            className="flex w-full justify-center rounded-md bg-teal-500 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-teal-600 cursor-pointer"
            id="submit-button"
            type="submit"
            value="Sign Up"
          />
        </form>

        <button
          onClick={() =>
            navigate("/signin", {
              state: { from: from },
            })
          }
          className="w-full mt-4 text-center text-xs text-teal-500 hover:text-teal-700 hover:font-semibold hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200 hover:scale-90"
        >
          Already got an account? Sign in now!
        </button>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
