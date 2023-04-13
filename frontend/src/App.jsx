import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './sign/SignIn';
import EditProfile from './pages/EditProfile';
import SignUp from './sign/SignUp';
import ForgotPw from './pages/ForgotPw';
import EditPassword from './pages/EditPassword';

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
  
  const user = {
    name: "Daniel",
    email: JSON.parse(localStorage.getItem('user')).email,
    phoneNumber: '234567810'
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route exact path = "/" element={<SignIn/>}/>
            <Route exact path = "/signup" element={<SignUp/>}/>
            <Route exact path = "/editprofile" element={<EditProfile user={user} />}/>
            <Route exact path = "/forgotpassword" element={<ForgotPw/>}/>
            <Route exact path = "/editpassword" element={<EditPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
