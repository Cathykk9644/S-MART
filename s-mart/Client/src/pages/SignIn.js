import React, { useState } from "react";
import { signIn } from "../api/firebase-authentication";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/smartSlice";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  // Add user from redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // Dispatch addUser functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signIn(state.email, state.password);
    if (user) {
      dispatch(
        addUser({
          _id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setState({
        email: "",
        password: "",
      });
      toast.success("You have successfully signed in to your account");
      setTimeout(
        () => navigate(from === "/register" || from === "/signin" ? "/" : from),
        3000
      );
    } else {
      toast.error("Incorrect email or password");
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
          Hey welcome back!
        </h2>
        <form
          className="flex flex-col items-center justify-center w-full sm:mt-12 mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <label className="block text-gray-500 text-sm">Email</label>
            <input
              className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 text-[10px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-500"
              type="text"
              name="email"
              placeholder="Your Email"
              value={state.email}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="w-full">
            <label className="text-gray-500 text-sm">Password</label>
            <input
              className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-500 text-[10px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-teal-500"
              type="password"
              name="password"
              placeholder="Your Password"
              value={state.password}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <input
            className="flex w-full justify-center rounded-md bg-teal-500 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-teal-600 cursor-pointer"
            id="submit-button"
            type="submit"
            value="Sign In"
          />
        </form>
        <button
          onClick={() =>
            navigate("/register", {
              state: { from: from },
            })
          }
          className="w-full mt-4 text-center text-xs text-teal-500 hover:text-teal-700 hover:font-semibold hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-200 cursor:pointer hover:scale-90"
        >
          New to S-Mart? Sign up here.
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

export default SignIn;
