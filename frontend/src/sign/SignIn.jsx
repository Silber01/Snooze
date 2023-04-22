import "./SignUpTextfield.css";
import SnoozeHeader from "../general/SnoozeHeader";
import React, { useState, useRef, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";

const SignIn = (props) => {
  console.log("on sign in page");
  // localStorage.clear('user')
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { login, error, isLoading } = useLogin();
  useEffect(() => {
    if (!error) {
      setEmailValid(true);
      setPasswordValid(true);
    } else {
      setEmailValid(false);
      setPasswordValid(false);
    }
    // else if (error == "Email not found") {
    //   setEmailValid(false)
    //   console.log("email not found")
    // } else if (error == "Incorrect password") {
    //   setPasswordValid(false)
    // } else {
    //   if (!emailRef.current.value) {
    //     setEmailValid(false)
    //   }
    //   if (!passwordRef.current.value) {
    //     setPasswordValid(false)
    //   }
    // }
  }, [error]);

  const handleSubmit = async () => {
    console.log(
      "logging in",
      emailRef.current.value,
      passwordRef.current.value
    );
    login(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <>
      <SnoozeHeader />
      <div className="Centerer">
        <div className="SignUpTextField">
          <p className="CreateAccountText"> Sign In</p>
          <form className="loginForm">
            <input
              type="text"
              className={validityClass(emailValid)}
              placeholder="Email Address"
              ref={emailRef}
            />
            <input
              type="password"
              className={validityClass(passwordValid)}
              placeholder="Password"
              ref={passwordRef}
            />
          </form>
          <button className="ContinueButton" onClick={handleSubmit}>
            Sign In
          </button>
          {getErrorDiv(error)}
          <p className="HaveAnAccountText">
            Don't have one? <a href="./signup"> Sign Up</a>
          </p>
          <p className="HaveAnAccountText">
            <a href="./forgotpassword">Forgot Password?</a>
          </p>
        </div>
      </div>
    </>
  );
};

function printEmailPasswordInsecure(emailRef, passwordRef) {
  console.log(emailRef.current.value);
  console.log(passwordRef.current.value);
}

function validityClass(valid) {
  if (valid) return "validText";
  return "invalidText";
}

function getErrorDiv(error) {
  if (!error) return;
  return (
    <div className="errorText">
      <span>{error}</span>
    </div>
  );
}

export default SignIn;
