import React from "react";
import { useState, useEffect } from "react";
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
  const [allUserData, setAllUserData] = useState({
    firstName: null,
    lastName: null,
    email: "test@gmail.com",
  })

  async function fetchData(email) {
    const response = await fetch("api/user/getUser/" + email);
    const data = await response.json()
    setAllUserData(data);
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      fetchData(user.email)
    }
  }, [])


  // useEffect(() => {
  //   console.log("User data: ");
  //   console.log(allUserData)
  // }, [allUserData])

  useEffect

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
              element={<ProfilePage user={allUserData} />}
            />
            <Route
              exact
              path="/editprofile"
              element={<EditProfile user={allUserData} />}
            />
            <Route exact path="/forgotpassword" element={<ForgotPw />} />
            <Route exact path="/editpassword" element={<EditPassword />} />
            <Route exact path="/payment" element={<Payment user={allUserData} />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
