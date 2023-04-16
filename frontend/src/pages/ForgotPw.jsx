import React from 'react'
import '../sign/SignUpTextfield.css'
import SnoozeHeader from '../general/SnoozeHeader'
import { useRef } from 'react'


const ForgotPw = (props) => {
  const emailRef = useRef();
  return (
    <>
      <SnoozeHeader />
        <div className='Centerer'>
            <div className="SignUpTextField">
              <p className="CreateAccountText"> Enter Email Address</p>
              <form className= 'loginForm'>
                  <input type="text" placeholder='Email Address' ref={emailRef}/>

              </form>
              <button className='ContinueButton' onClick={() => {sendForgotPassword(emailRef)}}>Continue</button>
            </div>
        </div>
      </>
    
  )
}

function sendForgotPassword(emailRef)
{
  console.log(emailRef.current.value)
}

export default ForgotPw