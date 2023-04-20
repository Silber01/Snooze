import React from 'react';
import './ViewHotelRoom.css';
import { useNavigate } from 'react-router-dom';
import SnoozeHeader from '../general/SnoozeHeader';

const ViewHotelRoom = (hotel) => {
    let navigate = useNavigate();

    return (
        <div className="ViewHotelRoom">

            <SnoozeHeader />

            <div className="room-type">
                <p className='title'>Insert Hotel Name Here {hotel.name}</p>
            </div>

            <div className="hotel-info-container">
                <div className="hotel-info">

                    <div className="hotel-info-text">
                        <p>Has WiFi</p>
                        <p># of beds: </p>
                    </div>

                    <div className="hotel-price">
                        <p>${hotel.price}</p>
                        <button className="reserve-button">Reserve</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


export default ViewHotelRoom