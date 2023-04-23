import { useState } from "react";
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

function App() {
  // for frontend testing only, will connect with backend and change these lines later

  // email_logged_in = JSON.parse(localStorage.getItem('user')).email
  // if (email_logged_in == null) {
  //   email_logged_in = 'daniel@gmail.com'
  // }
  // if you go to edit profile without logging in, the app will break and you will need to manually set "email" and run it,
  // then change it back to JSON.parse(localStorage.getItem('user')).email
  // the code above is what i tried to do to fix it, but it didn't work
  // - Connor

  let userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) {
    userData = {
      firstName: null,
      lastName: null,
      email: null,
    };
  }

  const user = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/viewhotelroom" element={<ViewHotelRoom />} />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
