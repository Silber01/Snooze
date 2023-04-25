import React from "react";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./sign/SignIn";
import EditProfile from "./profilePage/EditProfile";
import SignUp from "./sign/SignUp";
import ForgotPw from "./pages/ForgotPw";
import EditPassword from "./pages/EditPassword";
import ProfilePage from "./profilePage/ProfilePage";
import ViewHotelRoom from "./viewHotel/ViewHotelRoom";
import HomePage from "./home/HomePage";
import Payment from "./payment/Payment";
import { AuthContext } from "../context/AuthContext";

function App() {
  let userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) {
    userData = {
      firstName: null,
      lastName: null,
      email: "test@gmail.com",
    };
  }
  const user = {
    email: userData.email,
    firstName: "First",
    lastName: "Last",
  };

  let allUserData = {};
  async function fetchData() {
    const response = await fetch("api/user/getUser/context@gmail.com");
    const data = await response.json();
    console.log("fetch: ", data);
    return data;
  }
  allUserData = fetchData();
  console.log("all user data: ", { allUserData });

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={allUserData}>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/viewhotelroomS" element={<ViewHotelRoom />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route
              exact
              path="/profilepage"
              element={<ProfilePage user={user} />}
            />
            <Route
              exact
              path="/editprofile"
              element={<EditProfile user={user} />}
            />
            <Route exact path="/forgotpassword" element={<ForgotPw />} />
            <Route exact path="/editpassword" element={<EditPassword />} />
            <Route exact path="/payment" element={<Payment user={user} />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
