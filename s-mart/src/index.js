import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { UserProvider } from "./contexts/userContext";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <UserProvider>
          <App />
        </UserProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
