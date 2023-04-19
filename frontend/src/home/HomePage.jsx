import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import sampleHotelData from "../../sampleHotels.json"
import SnoozeHeader from '../general/SnoozeHeader'
import SearchBar from '../searchbar/SearchBar';
import './HomePage.css';
import {GrLocation} from 'react-icons/gr' //npm install react-icons --save
import {MdDateRange} from 'react-icons/md'
import {MdPeopleOutline} from 'react-icons/md'
import {BiSearch} from 'react-icons/bi'
import HotelFilter from "../filter/HotelFilter";

function HomePage(props) {
    let hotels = sampleHotelData.HOTELS  
    const searchRef = useRef();
    return (
        <div>
            <SnoozeHeader />
            <div className='searchBarWrapper'>
                <div className='SearchBarContainer'>
                    <SearchBar placeholder="Location">
                        <GrLocation className='searchbar-icon'/>
                    </SearchBar >
                    <SearchBar placeholder="Check in - out">
                        <MdDateRange className='searchbar-icon'/>
                    </SearchBar >
                    <SearchBar placeholder="Guest & Rooms">
                        <MdPeopleOutline className='searchbar-icon'/>
                    </SearchBar >
                    <button className='searchButton' type="submit" onClick={() => {
                            (searchRef)
                        }}>
                        Search
                    </button>
                </div>
            </div>
            <HotelFilter/>

            <div className='BannerContainer'>
                <h1>Wanna Earn Rewards? Sign Up Today and Begin Collecting Points!</h1>
            </div>
            
            
        </div>
        
        
    
    )
}


function printHotelRoom(hotel)

    {
        function hasWifiText(hasWifi)
        {
            if (hasWifi)
                return "Has Free Wifi"
            else
                return "No Free Wifi"
        }
        return (
            <>
            <div>{hotel.name}</div>
            <div>{hotel.description}</div>
            <div>{hotel.location.address}</div>
            <div>{hotel.location.city}</div>
            <div>{hotel.location.province}</div>
            <div>{hotel.location.country}</div>
            <div>ROOMS:</div>
            {
                hotel.rooms.map((room, i) => {
                    return (
                        <>
                            <div>{room.name}</div>
                            <div>${room.price}</div>
                            <div>{room.beds} bed </div>
                            <div>{hasWifiText(room.hasWifi)}</div>
                        </>
                    )
                })
            }
            </>
        )
    }


export default HomePage
