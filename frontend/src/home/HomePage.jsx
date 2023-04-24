import React, { useRef, useContext } from "react";
import sampleHotelData from "../../sampleHotels.json";
import NavBar from "../Navbar";
import Hotel from "../components/Hotel";
import hotelData from "../../hotelDataAll.json";
import { UserContext } from "../../context/UserContext";
import "./HomePage.css";

import { Box, Flex, Button, Input } from "@chakra-ui/react";

function HomePage(props) {
  let hotels = sampleHotelData.HOTELS;

  const userContext = useContext(UserContext);

  const searchRef = useRef();

  // one hotel entry to display on each square
  const { name, address, city, url } = hotelData[0].location; // I added all of our test data into "location" just for testing purposes
  // later on we'll do a loop through all the queried json requests.

  // create an array of empty squares to display as placeholders
  const numSquares = 20;
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
      {/*render all hotels, this will be a for loop through the json request later on*/}
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mt="8">
        {Array.from({ length: 10 }).map((_, index) => (
          <Hotel
            key={index}
            name={name}
            address={address}
            city={city}
            imageSrc={url}
            price={200}
          />
        ))}
      </Flex>
    </div>
  );
}

export default HomePage;
