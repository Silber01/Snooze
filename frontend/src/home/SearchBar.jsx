import React from "react";
import "./SearchBar.css";
import ReactDOM from "react-dom";
import { GrLocation } from "react-icons/gr"; //npm install react-icons --save

const SearchBar = ({ placeholder, children }) => {
  return (
    <div className="SearchBar">
      {children}
      <input type="text" placeholder={placeholder}></input>
    </div>
  );
};

export default SearchBar;
