import React from "react";
import "./SnoozeHeader.css";
import { useNavigate } from "react-router-dom";

function SnoozeHeader({ children }) {
  let navigate = useNavigate();
  function goHome() {
    navigate("/home")
  }
  return (
    <div className="SnoozeHeader">
      <img onClick={() => {goHome()}} src="../../assets/SnoozeLogo.svg"></img>
      {children}
    </div>
  );
}

export default SnoozeHeader;
