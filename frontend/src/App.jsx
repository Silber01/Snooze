import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './SignIn';
import EditProfile from './pages/EditProfile';
import SignUp from './pages/SignUp';

function App() {

  return (
    <div>
      {/* <SignIn/> */}
      <BrowserRouter>
        <Routes>
            <Route exact path = "/" element={<SignUp/>}/>
            <Route exact path = "/editprofile" element={<EditProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
