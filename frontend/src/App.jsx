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
    email: null,
  })

  async function fetchData(email, token) {
    let apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(apiUrl + "/api/user/getUser/" + email);
    const data = await response.json()
    data.token = token;
    setAllUserData(data);
  }

  useEffect(() => {
    updateUser()
  }, [])


  function updateUser() {
    let user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      fetchData(user.email, user.token)
    }
    else
      setAllUserData("NOT LOGGED IN")
  }


  // useEffect(() => {
  //   console.log("User data: ");
  //   console.log(allUserData)
  // }, [allUserData])


  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={allUserData}>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/hotel" element={<ViewHotelRoom />}>
              <Route path=":id" element={<ViewHotelRoom />} />
            </Route>
            <Route exact path="/home" element={<HomePage updateUser={updateUser}/>} />

            <Route 
              exact path="/profilepage" 
              element={<ProfilePage user={allUserData} updateUser={updateUser} />} />
            {/* <Route
              exact
              path="/editprofile"
              element={<EditProfile user={allUserData} />} /> */}
            
            <Route exact path="/forgotpassword" element={<ForgotPw />} />
            <Route exact path="/editpassword" element={<EditPassword />} />
            {/* <Route exact path="/payment" element={<Payment user={allUserData} />} /> */}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
