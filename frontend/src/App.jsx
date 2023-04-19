import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './sign/SignIn';
import EditProfile from './pages/EditProfile';
import SignUp from './sign/SignUp';
import ForgotPw from './pages/ForgotPw';
import EditPassword from './pages/EditPassword';
import ProfilePage from './pages/ProfilePage';

function App() {
  let userData = JSON.parse(localStorage.getItem('user'))
  if (!userData)
  { 
    userData = {
      // testing for profile page
      firstName: "Daniel",
      lastName: "Slade",
      email: "test@gmail.com",
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
            <Route exact path = "/profilepage" element={<ProfilePage user={user}/>}/>
            <Route exact path = "/editprofile" element={<EditProfile user={user}/>}/>
            <Route exact path = "/forgotpassword" element={<ForgotPw/>}/>
            <Route exact path = "/editpassword" element={<EditPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App