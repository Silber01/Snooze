import React from "react";
import "./ViewHotelRoom.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SnoozeHeader from "../general/SnoozeHeader";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import HotelNotFound from "../components/HotelNotFound";

function ViewHotelRoom() {
  let navigate = useNavigate();
  let params = useParams();
  let apiUrl = import.meta.env.VITE_API_URL;
  let sampleHotel = "643df8f5fae1b05a854b4307";

  let [hotel, setHotel] = useState(null);
  const userData = useContext(UserContext);
  console.log(userData);
  async function fetchData(hotelID) {
    let apiCall = apiUrl + "/api/hotel/" + hotelID;
    const response = await fetch(apiCall);
    const data = await response.json();
    console.log(data);
    setHotel(data);
  }

  useEffect(() => {
    fetchData(params.id);
  }, []);

  // useEffect(() => {
  //   console.log(hotel)
  // }, [hotel])

  console.log(params.id);
  if (!hotel || !hotel.name) {
    return <HotelNotFound />;
  }
  return (
    <div className="ViewHotelRoom">
      <SnoozeHeader />

      <div className="room-type">
        <p className="title">{hotel.name}</p>
      </div>

      <div className="hotel-info-container">
        <div className="hotel-info">
          <div className="hotel-info-text">
            <p>Has WiFi</p>
            <p># of beds: </p>
          </div>

          <div className="hotel-price">
            <p>$test</p>
            <button className="reserve-button">Reserve</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewHotelRoom;
