import React, { useState } from "react";
import { register } from "../api/firebase-authentication";
import { useNavigate, useLocation } from "react-router-dom";

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
        setState({
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate(from === "/register" || from === "/signin" ? "/" : from);
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
      <div className="flex flex-col items-center justify-start h-full sm:max-w-sm sm:w-full">
        {/* <button onClick={() => console.log(location)}>Location</button> */}
        <h2 className="mt-16 text-2xl font-bold text-gray-900">
          Register a new account
        </h2>
        <form
          className="flex flex-col items-center justify-center w-full mt-12 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <label className="block text-gray-900">Email</label>
            <input
              className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-teal-500"
              type="text"
              name="email"
              placeholder="Your Email"
              value={state.name}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="w-full">
            <label>Password</label>
            <input
              className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-teal-500"
              type="password"
              name="password"
              placeholder="Your Password"
              value={state.password}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between">
              <label>Retype Password</label>
              {state.password === state.confirmPassword ? (
                <br />
              ) : (
                <div className="text-sm text-red-700 leading-6">
                  Passwords must match
                </div>
              )}
            </div>

            <input
              className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-teal-500"
              type="password"
              name="confirmPassword"
              placeholder="Your Password"
              value={state.confirmPassword}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <input
            className="flex w-full justify-center rounded-md bg-teal-600 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-teal-500"
            id="submit-button"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
