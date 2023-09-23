import React from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from "./api/api";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, loader: productsData },
      { path: "/cart", element: <Cart /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <div className="font-titleFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
