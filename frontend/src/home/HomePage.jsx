import React, { useRef, useContext, useState, useEffect } from "react";
import sampleHotelData from "../../sampleHotels.json";
import NavBar from "../Navbar";
import Hotel from "../components/Hotel";
import HomeBanner from "../banner/HomeBanner";
import hotelData from "../../hotelDataAll.json";
import { UserContext } from "../../context/UserContext";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { dateToUnix, intervalLength, isNotPast } from "../intervals";
import HotelNotFound from "../components/HotelNotFound";

import {
  Box,
  Flex,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Grid,
  Select,
  Text,
  filter,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Ratings from "../ratings/Ratings";

function HomePage(props) {
  let [hotels, setHotels] = useState([]);
  let [hasSearched, setHasSearched] = useState(false);
  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (userContext == "NOT LOGGED IN") {
      navigate("/");
    }
  }, [userContext]);

  async function fetchHotels() {
    let apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(apiUrl + "/api/hotel");
    const data = await response.json();
    setHotels(data);
  }

  async function checkCollision(firstDate, lastDate, setCollides) {
    console.log(userContext)
    if (!userContext.token || !firstDate || !lastDate)
      return;
    const bearerToken = "Bearer " + userContext.token;
    
    const response = await fetch(
      "http://localhost:4000" + "/api/user/checkCollisions?firstDate=" + firstDate + "&lastDate=" + lastDate,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        }
      }
    );
    const json = await response.json();
    console.log(json)
    if (json.valid) {
      console.log("Does not collide");
      setCollides(false)
    }
    else {
      console.log("collides");
      setCollides(true)
    }
  };

  async function searchHotels(location, minPrice, maxPrice, rating, sort) {
    let apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(
      apiUrl +
        "/api/hotel/search/?location=" +
        location +
        "&minRating=" +
        rating +
        "&minPrice=" +
        minPrice +
        "&maxPrice=" +
        maxPrice +
        "&sort=" +
        sort
    );
    const data = await response.json();
    setHotels(data);
  }

  useEffect(() => {
    console.log(props.updateUser)
    props.updateUser();
    fetchHotels();
    checkValidDates();
    console.log(userContext)
  }, []);

  // useEffect(() => {
  //   console.log(hotels);
  // }, [hotels]);

  const searchRef = useRef();

  const locationRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const ratingRef = useRef();
  const sortRef = useRef();
  // const [errorMessage, setErrorMessage] = useState(""); was used to display an error message when booking dates were in the past
  const [priceSlider, setPriceSlider] = useState([0, 2000]);
  const [validDates, setValidDates] = useState(true);
  const [collides, setCollides] = useState(false)
  const [datesWrong, setDatesWrong] = useState(false)

  function search() {
    let location = locationRef.current.value;
    let checkIn = checkInRef.current.value;
    let checkOut = checkOutRef.current.value;
    let minPrice = priceSlider[0];
    let maxPrice = priceSlider[1];
    let rating = ratingRef.current.value;
    let sort = sortRef.current.value;

    // console.log(location);
    console.log(checkIn);
    console.log(checkOut);

    if (validDates) {
      searchHotels(location, minPrice, maxPrice, rating, sort);
    }

    // console.log(minPrice);
    // console.log(maxPrice);
    // console.log(rating);
    // console.log(sessionStorage.getItem("checkInDate"));
    // console.log(sessionStorage.getItem("checkOutDate"));
    // console.log(hotels)
    setHasSearched(true);
  }
  
  function datesMakeSense() {
    let checkIn = checkInRef.current.value;
    let checkOut = checkOutRef.current.value;
    setDatesWrong(!((intervalLength(checkIn, checkOut) > 0) && isNotPast(checkIn) && isNotPast(checkOut)))
  }

  function checkValidDates() {
    datesMakeSense()
    checkCollision(checkInRef.current.value, checkOutRef.current.value, setCollides)
  }

  useEffect(() => {
    console.log(collides, datesWrong)
    setValidDates(!collides && !datesWrong)
  }, [collides, datesWrong])

  // useEffect(() => {
  //   let checkIn = checkInRef.current.value;
  //   let checkOut = checkOutRef.current.value;
  //   console.log(validDates)
  //   console.log("interval length: " + intervalLength(checkIn, checkOut))
  //   console.log(isNotPast(checkIn))
  //   console.log(isNotPast(checkOut))
  // }, [validDates])

  function WarningText() {
    if (datesWrong)
    {
      return (
        <Text color="red" textAlign="center">The inputted dates are invalid.</Text>
      )
    }
    if (collides)
    {
      return (
        <Text color="red" textAlign="center">You already have a booking during this time!</Text>
      )
    }
    
    return (
      <></>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="searchBarWrapper">
        <div className="SearchBarContainer">
          <Grid templateRows="0fr 1fr">
            <Grid templateColumns="2fr 2fr 2fr 2fr 1fr 1fr" gap="5" mb="2">
              <Text textAlign="center">Hotel Location</Text>
              <Text textAlign="center">Check In Date</Text>
              <Text textAlign="center">Check Out Date</Text>
              <Text textAlign="center"></Text>
              <Text textAlign="center">Sort by</Text>
              <Text textAlign="center"></Text>
            </Grid>
            <Grid templateColumns="2fr 2fr 2fr 2fr 1fr 1fr" gap="5">
              <Input
                size="lg"
                variant="filled"
                placeholder="Location"
                marginRight={10}
                ref={locationRef}
              />
              <Input
                type="date"
                size="lg"
                variant="filled"
                placeholder="Check In Date"
                marginRight={10}
                ref={checkInRef}
                isInvalid={!validDates}
                defaultValue={sessionStorage.getItem("checkInDate")}
                onChange={() => {
                  sessionStorage.setItem(
                    "checkInDate",
                    checkInRef.current.value
                  );
                  checkValidDates();
                }}
              />
              <Input
                type="date"
                size="lg"
                variant="filled"
                placeholder="Check Out Date"
                marginRight={10}
                ref={checkOutRef}
                isInvalid={!validDates}
                defaultValue={sessionStorage.getItem("checkOutDate")}
                onChange={() => {
                  sessionStorage.setItem(
                    "checkOutDate",
                    checkOutRef.current.value
                  );
                  checkValidDates();
                }}
              />

              <Button
                background="#c6c1dc"
                type="submit"
                textColor="white"
                size="lg"
                onClick={() => {
                  search();
                }}
                width="40%"
              >
                Search
              </Button>
              {/* error message displayed when dates are in the past (not used atm.) */}
              {/* {errorMessage && (
                <div style={{ marginLeft: "10px", color: "red" }}>
                  {errorMessage}
                </div>
              )} */}
              {/* error message displayed when dates are in the past (not used atm.) */}
              <Select variant="filled" ref={sortRef}>
                <option value="1">Alphabetically</option>
                <option value="2">Rating</option>
                <option value="3">Price: Low to High</option>
                <option value="4">Price: High to Low</option>
              </Select>
              {/* Start Filter Code from Hell */}
              <div className="filterButton">
                <Menu>
                  <MenuButton
                    as={Button}
                    size="md"
                    display="flex"
                    rightIcon={<ChevronDownIcon />}
                  >
                    Filter
                  </MenuButton>
                  <MenuList minH="350px" minW="350px" padding={25}>
                    <b>Price Range</b>
                    <RangeSlider
                      aria-label={["min", "max"]}
                      defaultValue={[0, 2000]}
                      onChange={(val) => setPriceSlider(val)}
                      min={0}
                      max={2000}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                    <Flex justify={"space-between"} align={"center"}>
                      <p>{"$" + priceSlider[0]}</p>
                      <p>
                        {priceSlider[1] >= 2000
                          ? "$2000+"
                          : "$" + priceSlider[1]}
                      </p>
                    </Flex>
                    <Flex>
                      <Ratings
                        size={48}
                        scale={5}
                        fillColor="gold"
                        strokeColor="grey"
                        ref={ratingRef}
                      />
                    </Flex>
                    <Flex justifyContent="flex-end" pt={8}>
                      <Button
                        backgroundColor="#c6c1dc"
                        textColor="white"
                        type="submit"
                        onClick={() => {
                          search();
                        }}
                        width="40%"
                        padding={25}
                      >
                        Confirm
                      </Button>
                    </Flex>
                  </MenuList>
                </Menu>
              </div>
              {/* End Filter Code from Hell */}
            </Grid>
          </Grid>
        </div>
      </div>
      <Box background="#c1dcc6" pb="5">
        <WarningText />
      </Box>
      
      {/*
      <HomeBanner />
                  */}
      {/* <HotelFilter /> */}
      {/*render all hotels, this will be a for loop through the json request later on*/}
      {hotels.length > 0 ? (
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          mt="8"
        >
          {hotels.map((hotel, index) => (
            <Hotel key={index} hotel={hotel} canBook={validDates} />
          ))}
        </Flex>
      ) : hasSearched ? (
        <HotelNotFound displayNavbar={false} displayReturnToHome={false} />
      ) : null}
    </div>
  );
}

export default HomePage;
