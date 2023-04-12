import React from 'react'
import './SignUpTextfield.css'
import './loginForm.css'
import SnoozeHeader from '../general/SnoozeHeader'
import { useState, useRef } from 'react'

const SignIn = (props) => {
  const emailRef = useRef()
  const passwordRef = useRef()

  return (
    <>
      <SnoozeHeader />
        <div className='Centerer'>
            <div className="SignUpTextField">
              <p className="CreateAccountText"> Sign In</p>
              <form className= 'loginForm'>
                  <input type="text" placeholder='Email Address' ref={emailRef}/>
                  <input type="password" placeholder='Password' ref={passwordRef}/>
              </form>
              <button className='ContinueButton' onClick={() => {printEmailPasswordInsecure(emailRef, passwordRef)}}>Sign In</button>
              <p className='HaveAnAccountText'>Don't have one? <a href="./signup"> Sign Up</a></p>
              <p className='HaveAnAccountText'><a href="./forgotpassword">Forgot Password?</a></p>
            </div>
        </div>
      </>
    
  )
}

function printEmailPasswordInsecure(emailRef, passwordRef)
{
  console.log(emailRef.current.value)
  console.log(passwordRef.current.value)
}


export default SignIn
