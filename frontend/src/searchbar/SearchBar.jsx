import React from 'react'
import "./SearchBar.css"
import ReactDOM from "react-dom";
import Search from "./Search";

const SearchBar = (props) => {
    return (
        <div className="SearchBar">
        <div className="IconInput">
          <input
            value={props.contactsValue}
            onChange={props.onChangeHandler}
            className="prompt"
            type="text"
            placeholder="Location"
          />
          <i className="SearchIcon" />
        </div>
        <div className="Results" />
      </div>
    )
};


export default SearchBar