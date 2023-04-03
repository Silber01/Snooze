import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './SignIn';
import EditProfile from './pages/EditProfile';

function App() {

  return (
    <div>
      {/* <SignIn/> */}
      <BrowserRouter>
        <Routes>
              <Route exact path = "/" element={<SignIn/>}/>
              <Route exact path = "/editprofile" element={<EditProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
