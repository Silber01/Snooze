import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './SignIn';
import EditProfile from './pages/EditProfile';
import SignUp from './pages/SignUp';

function App() {
  // for frontend testing only, will connect with backend and change these lines later
  const user = {
    name: "Daniel",
    email: "test@gmail.com",
    phoneNumber: '234567810'
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route exact path = "/" element={<SignIn/>}/>
            <Route exact path = "/signup" element={<SignUp/>}/>
            <Route exact path = "/editprofile" element={<EditProfile user={user} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
