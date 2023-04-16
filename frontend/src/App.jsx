import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './sign/SignIn';
import EditProfile from './pages/EditProfile';
import SignUp from './sign/SignUp';
import ForgotPw from './pages/ForgotPw';
import EditPassword from './pages/EditPassword';
import Payment from './pages/payment/Payment'

function App() {
  let userData = JSON.parse(localStorage.getItem('user'))
  if (!userData)
  { 
    userData = {
      firstName: null,
      lastName: null,
      email: null
    }
  }
  
  const user = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
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
            <Route exact path = "/payment" element={<Payment user={user} />}/>
            <Route exact path = "/payment" element={<Payment user={user} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App