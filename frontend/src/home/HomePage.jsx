import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import sampleHotelData from "../../sampleHotels.json"
import SnoozeHeader from '../general/SnoozeHeader'

function HomePage(props) {
    let hotels = sampleHotelData.HOTELS
    
    
    return (
        <>
        <SnoozeHeader />
            {hotels.map((hotel, i) => {
                return (
                    <>{printHotelRoom(hotel)}</>
                )
            }) }
        </>
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
