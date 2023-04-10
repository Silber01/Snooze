import React from 'react'
import '../sign/SignUpTextField.css'
import SnoozeHeader from '../general/SnoozeHeader'

const ForgotPw = (props) => {
  return (
    <>
      <SnoozeHeader />
        <div className='Centerer'>
            <div className="SignUpTextField">
              <p className="CreateAccountText"> Enter Email Address</p>
              <form className= 'loginForm'>
                  <input type="text" placeholder='Email Address'/>

              </form>
              <button className='ContinueButton'>Continue</button>
            </div>
        </div>
      </>
    
  )
}

export default ForgotPw