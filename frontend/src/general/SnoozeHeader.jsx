import React from "react";
import "./SnoozeHeader.css";

function SnoozeHeader({ children }) {
  return (
    <div className="SnoozeHeader">
      <img src="../../assets/SnoozeLogo.svg"></img>
      {children}
    </div>
  );
}

export default SnoozeHeader;
