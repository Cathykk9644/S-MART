import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { UserProvider } from "./contexts/userContext";
import { ProductProvider } from "./contexts/productContext";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <ProductProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProductProvider>
  </UserProvider>
);
