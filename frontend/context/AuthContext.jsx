import React, { Component } from "react";
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();
export const UserContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        firstName: "First Name",
        lastName: "Last Name",
      };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    firstName: "First Name",
    lastName: "Last Name",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("logged in context ", { user });
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: user,
        firstName: "First Name",
        lastName: "Last Name",
      });
    }
  }, []);

  //console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
