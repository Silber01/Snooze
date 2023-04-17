import React from 'react'
import "./SearchBar.css"
import ReactDOM from "react-dom";

const SearchBar = ({placeholderText, onChangeHandler}) => {
    return (
        <div className="SearchBar">
        <div className="IconInput">
          <input
            onChange={onChangeHandler}
            className="prompt"
            type="text"
            placeholder={placeholderText}
          />
          <i className="SearchIcon" />
        </div>
        <div className="Results" />
      </div>
    )
};


export default SearchBar