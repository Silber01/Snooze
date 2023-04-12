import React from 'react';
import './SignUp.css';
import './SignUpTextfield.css';
import SnoozeHeader from '../general/SnoozeHeader';
import { useState, useRef } from 'react'

const SignUp = (props) => {
  const emailRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const passwordRef = useRef()
  
  return (
    <div className="SignUp">
      <SnoozeHeader />
      <div className='Centerer'>
            <div className="SignUpTextField">
                <p className='CreateAccountText'>Create An Account</p>
                <form className='loginForm'>
                    <input type="text" placeholder="Email Address" ref={emailRef}/>
                    <input type="text" placeholder="First Name"ref={firstNameRef}/>
                    <input type="text" placeholder='Last Name'ref={lastNameRef}/>
                    <input type="password" placeholder='Password'ref={passwordRef}/>
                </form>
                <button className='ContinueButton' onClick={() => { sendSignUpInfo(emailRef, firstNameRef, lastNameRef, passwordRef)}}>Continue</button>
                <p className='HaveAnAccountText'>Aleady have an account? <a href="./">Sign in</a></p>
            </div>
            
        </div>
    </div>
  )
}

function sendSignUpInfo(emailRef, firstNameRef, lastNameRef, passwordRef)
{
  console.log(emailRef.current.value)
  console.log(firstNameRef.current.value)
  console.log(lastNameRef.current.value)
  console.log(passwordRef.current.value)
}

export default SignUp




{/* <div className="sign-up-sign-up-web">
        <span className="sign-up-text">
          <span>Create an Account</span>
        </span>
        <img
          src="/playground_assets/rectangle304223-43um-200h.png"
          alt="Rectangle304223"
          className="sign-up-rectangle30"
        />
        <img
          src="/playground_assets/rectangle314224-savm-200h.png"
          alt="Rectangle314224"
          className="sign-up-rectangle31"
        />
        <img
          src="/playground_assets/rectangle324224-nicc-200h.png"
          alt="Rectangle324224"
          className="sign-up-rectangle32"
        />
        <img
          src="/playground_assets/rectangle334224-bwrs-200h.png"
          alt="Rectangle334224"
          className="sign-up-rectangle33"
        />
        <img
          src="/playground_assets/rectangle344224-rjsf-200h.png"
          alt="Rectangle344224"
          className="sign-up-rectangle34"
        />
        <span className="sign-up-text02">
          <span>Continue</span>
        </span>
        <span className="sign-up-text04">
          <span>Email Address</span>
        </span>
        <span className="sign-up-text06">
          <span>Password</span>
        </span>
        <span className="sign-up-text08">
          <span>Last Name</span>
        </span>
        <span className="sign-up-text10">
          <span>First Name</span>
        </span>
        <img
          src="/playground_assets/rectangle405653-9mb-200h.png"
          alt="Rectangle405653"
          className="sign-up-rectangle40"
        />
        <img
          src="/playground_assets/logotext4225-j51w-200h.png"
          alt="LogoText4225"
          className="sign-up-logo-text"
        />
        <span className="sign-up-text12">
          <span className="sign-up-text13">
            Already have an account?
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className="sign-up-text14">
            Sign in
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
        </span>
      </div> */}