import React from "react";
import "./SignUpTextfield.css";
import SnoozeHeader from "../general/SnoozeHeader";
import { useState, useRef, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";

const SignUp = (props) => {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const { signup, error, isLoading } = useSignup();
  const [emailValid, setEmailValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  useEffect(() => {
    console.log(error);
    setEmailValid(true);
    setFirstNameValid(true);
    setLastNameValid(true);
    setPasswordValid(true);
    if (!error) {
      console.log("successful signup");
    } else if (error == "Invalid email") setEmailValid(false);
    else if (error == "Password not strong enough") setPasswordValid(false);
    else if (error == "Email already in use") setEmailValid(false);
    else {
      if (!emailRef.current.value) setEmailValid(false);
      if (!firstNameRef.current.value) setFirstNameValid(false);
      if (!lastNameRef.current.value) setLastNameValid(false);
      if (!passwordRef.current.value) setPasswordValid(false);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(
      emailRef.current.value,
      passwordRef.current.value,
      firstNameRef.current.value,
      lastNameRef.current.value
    );
  };
  return (
    <div className="SignUp">
      <SnoozeHeader />
      <div className="Centerer">
        <div className="SignUpTextField">
          <p className="CreateAccountText">Create An Account</p>
          <form className="loginForm">
            <input
              type="text"
              className={validityClass(emailValid)}
              placeholder="Email Address"
              ref={emailRef}
            />
            <input
              type="text"
              className={validityClass(firstNameValid)}
              placeholder="First Name"
              ref={firstNameRef}
            />
            <input
              type="text"
              className={validityClass(lastNameValid)}
              placeholder="Last Name"
              ref={lastNameRef}
            />
            <input
              type="password"
              className={validityClass(passwordValid)}
              placeholder="Password"
              ref={passwordRef}
            />
          </form>
          <button className="ContinueButton" onClick={handleSubmit}>
            Continue
          </button>
          {getErrorDiv(error)}
          <p className="HaveAnAccountText">
            Already have an account? <a href="./">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

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

// SHOWS PASSWORD AS PLAINTEXT, INSECURE! DO NOT USE IN PROD
// function sendSignUpInfo(emailRef, firstNameRef, lastNameRef, passwordRef, signup)
// {
//   console.log(emailRef.current.value)
//   console.log(firstNameRef.current.value)
//   console.log(lastNameRef.current.value)
//   console.log(passwordRef.current.value)
// }

export default SignUp;
