import React from 'react'
import '../sign/SignUpTextField.css'
import SnoozeHeader from '../general/SnoozeHeader'
import { useRef } from 'react'


const EditPassword = (props) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef()
  return (
    <>
      <SnoozeHeader />
        <div className='Centerer'>
            <div className="SignUpTextField">
              <p className="CreateAccountText"> New Password</p>
              <form className= 'loginForm'>
                  <input type="password" placeholder='New Password' ref={passwordRef}/>
                  <input type="password" placeholder='Confirm Password'ref={confirmPasswordRef}/>
              </form>
              <button className='ContinueButton' onClick={() => {sendEditPassword(passwordRef, confirmPasswordRef)}}>Continue</button>
            </div>
        </div>
      </>
    
  )
}
function sendEditPassword (passwordRef, confirmPasswordRef){
  console.log(passwordRef.current.value)
  console.log(confirmPasswordRef.current.value)
}
export default EditPassword