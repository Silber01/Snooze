import React, { useRef, useContext, useState, useEffect } from "react";
import sampleHotelData from "../../sampleHotels.json";
import NavBar from "../Navbar";
import Hotel from "../components/Hotel";
import HomeBanner from "../banner/HomeBanner";
import hotelData from "../../hotelDataAll.json";
import { UserContext } from "../../context/UserContext";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { dateToUnix } from "../intervals";

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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Ratings from "../ratings/Ratings";

function HomePage(props) {
  let [hotels, setHotels] = useState([]);

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

  async function searchHotels(location, minPrice, maxPrice, rating)
  {
    let apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(apiUrl + "/api/hotel/search/?location=" + location + "&minRating=" + rating + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice);
    const data = await response.json();
    setHotels(data);
  }

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    console.log(hotels);
  }, [hotels]);

  const searchRef = useRef();

  const locationRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const ratingRef = useRef();
  const [priceSlider, setPriceSlider] = useState([0, 2000]);
  const [validDates, setValidDates] = useState(true);

  function search() {
    let location = locationRef.current.value;
    let checkIn = checkInRef.current.value;
    let checkOut = checkOutRef.current.value;
    let minPrice = priceSlider[0];
    let maxPrice = priceSlider[1];
    let rating = ratingRef.current.value;

    console.log(location);
    console.log(checkIn);
    console.log(checkOut);
    console.log(minPrice);
    console.log(maxPrice);
    console.log(rating);
    console.log(sessionStorage.getItem("checkInDate"));
    console.log(sessionStorage.getItem("checkOutDate"));
    searchHotels(location, minPrice, maxPrice, rating)
    console.log(hotels)
  }

  function checkValidDates() {
    setValidDates(
      dateToUnix(sessionStorage.getItem("checkInDate")) <=
        dateToUnix(sessionStorage.getItem("checkOutDate"))
    );
  }

  return (
    <div>
      <NavBar />
      <div className="searchBarWrapper">
        <div className="SearchBarContainer">
          Search for a Hotel
          <Flex>
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
                sessionStorage.setItem("checkInDate", checkInRef.current.value);
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
          </Flex>
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
                  onChangeEnd={(val) => setPriceSlider(val)}
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
                    {priceSlider[1] >= 2000 ? "$2000+" : "$" + priceSlider[1]}
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
                      console.log(checkInRef.current.value);
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
        </div>
      </div>
      {/*
      <HomeBanner />
                  */}
      {/* <HotelFilter /> */}
      {/*render all hotels, this will be a for loop through the json request later on*/}
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mt="8">
        {hotels.map((hotel, index) => (
          <Hotel key={index} hotel={hotel} canBook={validDates} />
        ))}
      </Flex>
    </div>
  );
}

export default HomePage;
