import React from 'react'
import "./SignUpTextfield.css"
import "./loginForm.css"


function SignUpTextField()
{
    return (
        <div className='Centerer'>
            <div className="SignUpTextField">
                <p className='CreateAccountText'>Create An Account</p>
                <form className='loginForm'>
                    <input type="text" placeholder="Email Address"/>
                    <input type="text" placeholder="First Name"/>
                    <input type="text" placeholder='Last Name'/>
                    <input type="password" placeholder='Password'/>
                </form>
                <button className='ContinueButton'>Continue</button>
                <p className='HaveAnAccountText'>Aleady have an account? <a href="http://localhost:5173/">Sign in</a></p>
            </div>
            
        </div>

    )
}

export default SignUpTextField
