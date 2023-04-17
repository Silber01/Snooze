import React from 'react'
import "./SearchBar.css"
import ReactDOM from "react-dom";
import {GrLocation} from 'react-icons/gr' //npm install react-icons --save



const SearchBar = ({placeholder, children}) => {

    return (
        <div className="SearchBar">
            {children}
            <div className='input flex'>
                <input type="text" placeholder={placeholder}></input>
            </div>
        </div>
    )
};


export default SearchBar


/*
<div className='searchButton'>
                    <div className='input flex'>
                        <button className='continueSearchButton' type="submit" onClick={() => {(searchRef)}}>Search</button>
                        <BiSearch className="searchIcon"/>
                    </div>
                </div>
*/