import React from 'react'
import "./SearchBar.css"
import ReactDOM from "react-dom";
import {GrLocation} from 'react-icons/gr' //npm install react-icons --save
import {MdDateRange} from 'react-icons/md'
import {MdPeopleOutline} from 'react-icons/md'

const SearchBar = ({}) => {
    return (
        <div className="SearchBar">
            <div className='locationInput'>
                <div className='input flex'>
                    <input type="text" placeholder='Location'></input>
                </div>
            </div>

            <div className='dateInput'>
                <div className='input flex'>
                    <input type="date" placeholder='Check in - out'></input>
                </div>
            </div>

            <div className='guestRoomInput'>
                <div className='input flex'>
                    <input type="text" placeholder='Guest & rooms'></input>
                </div>
            </div>

            <div className = 'homeIcons flex'>
                <div className='leftIcons'>
                    <GrLocation className='icon'/>
                    <MdDateRange className='icon'/>
                    <MdPeopleOutline className='icon'/>
                </div>

            </div>
        </div>
    )
};


export default SearchBar