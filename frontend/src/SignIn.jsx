import React from 'react'
import './sign/SignUpTextField.css'
import SnoozeHeader from './general/SnoozeHeader'

const SignIn = (props) => {
  return (
    <>
      <SnoozeHeader />
        <div className='Centerer'>
            <div className="SignUpTextField">
              <p className="CreateAccountText"> Sign In</p>
              <form className= 'loginForm'>
                  <input type="text" placeholder='Email Address'/>
                  <input type="text" placeholder='Password'/>
              </form>
              <button className='ContinueButton'>Sign In</button>
              <p className='HaveAnAccountText'>Don't have one? <a href="http://localhost:5173/signup"> Sign Up</a></p>
              <p className='HaveAnAccountText'><a href="http://localhost:5173/forgotpassword">Forgot Password?</a></p>
            </div>
        </div>
      </>
    
  )
}

export default SignIn
