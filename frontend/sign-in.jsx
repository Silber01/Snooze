import React from 'react'

import styles from './src/sign-in.css'

const SignIn = (props) => {
  return (
    <div className="sign-in-container">
      <div className="sign-in-sign-in-web">
        <span className="sign-in-text">
          <span>Sign In</span>
        </span>
        <img
          src="/playground_assets/rectangle306010-14ar-200h.png"
          alt="Rectangle306010"
          className="sign-in-rectangle30"
        />
        <img
          src="/playground_assets/rectangle336013-vxwn-200h.png"
          alt="Rectangle336013"
          className="sign-in-rectangle33"
        />
        <img
          src="/playground_assets/rectangle346014-v0pg-200h.png"
          alt="Rectangle346014"
          className="sign-in-rectangle34"
        />
        <span className="sign-in-text02">
          <span>Continue</span>
        </span>
        <span className="sign-in-text04">Email Address</span>
        <span className="sign-in-text05">Password</span>
        <img
          src="/playground_assets/rectangle406020-uskr-200h.png"
          alt="Rectangle406020"
          className="sign-in-rectangle40"
        />
        <img
          src="/playground_assets/logotext6021-sv1m-200h.png"
          alt="LogoText6021"
          className="sign-in-logo-text"
        />
        <img
          src="/playground_assets/line36022-j1y.svg"
          alt="Line36022"
          className="sign-in-line3"
        />
        <span className="sign-in-text06">
          <span className="sign-in-text07">
            Don’t have one?
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className="sign-in-text08">
            Sign Up
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
        </span>
        <span className="sign-in-text09">
          <span>Forgot Password?</span>
        </span>
      </div>
    </div>
  )
}

export default SignIn