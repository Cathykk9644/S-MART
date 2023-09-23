import { createContext, useContext, useState, useEffect } from "react";
import { reAuth as reAuthApi } from "../api/firebase-authentication";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const state = {
    user,
    setUser,
  };

  const reAuth = () => {
    const checkIfLoggedIn = (authedUser) => {
      setUser(authedUser);
      console.log(authedUser);
    };
    try {
      reAuthApi(checkIfLoggedIn);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reAuth();
  }, []);

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
