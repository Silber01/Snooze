import React from 'react'
import '../sign/SignUpTextField.css'
import SnoozeHeader from '../general/SnoozeHeader'

const EditPassword = (props) => {
  return (
    <>
      <SnoozeHeader />
        <div className='Centerer'>
            <div className="SignUpTextField">
              <p className="CreateAccountText"> New Password</p>
              <form className= 'loginForm'>
                  <input type="text" placeholder='New Password'/>
                  <input type="text" placeholder='Confirm Password'/>
              </form>
              <button className='ContinueButton'>Continue</button>
            </div>
        </div>
      </>
    
  )
}

export default EditPassword