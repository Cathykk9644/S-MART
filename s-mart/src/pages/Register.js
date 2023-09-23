import React, { useState } from "react";
import { register } from "../api/firebase-authentication";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      const user = await register(state.email, state.password);
      if (user) {
        setState({
          email: "",
          password: "",
        });
        navigate("/");
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
        <h2 className="mt-24 text-2xl font-bold text-gray-900">
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
              type="text"
              name="password"
              placeholder="Your Password"
              value={state.password}
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
