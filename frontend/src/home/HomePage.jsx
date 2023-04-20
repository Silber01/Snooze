import React, { useRef } from "react";
import sampleHotelData from "../../sampleHotels.json";
import NavBar from "../general/Navbar";
import "./HomePage.css";

import { Box, Flex, Button, Input } from "@chakra-ui/react";

function HomePage(props) {
  let hotels = sampleHotelData.HOTELS;
  const searchRef = useRef();

  const numSquares = 20;
  // create an array of empty squares to display as placeholders
  const emptySquares = Array.from(Array(numSquares)).map((_, index) => (
    <Box
      key={index}
      w={["90vw", "80vw", "400px"]}
      h={["90vw", "80vw", "400px"]}
      bg="gray.200"
      m="3"
    />
  ));

  return (
    <div>
      <NavBar />
      <div className="searchBarWrapper">
        <div className="SearchBarContainer">
          Search for a Hotel
          <Flex>
            <Input
              size="md"
              variant="filled"
              placeholder="Location"
              marginRight={10}
            />
            <Input
              size="md"
              variant="filled"
              placeholder="Check In Date"
              marginRight={10}
            />
            <Input
              size="md"
              variant="filled"
              placeholder="Check Out Date"
              marginRight={10}
            />
            <Button
              colorScheme="green"
              type="submit"
              onClick={() => {
                searchRef;
              }}
              width="40%"
            >
              Search
            </Button>
          </Flex>
        </div>
      </div>
      {/* <HotelFilter /> */}
      {/*render all hotels*/}
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mt="8">
        {emptySquares}
      </Flex>
    </div>
  );
}

function printHotelRoom(hotel) {
  function hasWifiText(hasWifi) {
    if (hasWifi) return "Has Free Wifi";
    else return "No Free Wifi";
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
      {hotel.rooms.map((room, i) => {
        return (
          <>
            <div>{room.name}</div>
            <div>${room.price}</div>
            <div>{room.beds} bed </div>
            <div>{hasWifiText(room.hasWifi)}</div>
          </>
        );
      })}
    </>
  );
}

export default HomePage;
