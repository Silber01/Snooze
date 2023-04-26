import React, { useRef, useContext, useState, useEffect } from "react";
import sampleHotelData from "../../sampleHotels.json";
import NavBar from "../Navbar";
import Hotel from "../components/Hotel";
import hotelData from "../../hotelDataAll.json";
import { UserContext } from "../../context/UserContext";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

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
  let [hotels, setHotels] = useState([])

  const userContext = useContext(UserContext);
  console.log({ userContext });
  const navigate = useNavigate()


  async function fetchHotels() {
    let apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(apiUrl + "/api/hotel");
    const data = await response.json()
    setHotels(data);
  }

  useEffect(() => {
      fetchHotels()
  }, [])

  useEffect(() => {
    if (userContext == "NOT LOGGED IN")
    {
      navigate("/")
    }
  }, [userContext])

  useEffect(() => {
   console.log(hotels) 
  }, [hotels])

  

  const searchRef = useRef();
  const [priceSlider, setPriceSlider] = useState([0, 2000]);

  // one hotel entry to display on each square
  const { name, address, city, url } = hotelData[0].location; // I added all of our test data into "location" just for testing purposes
  // later on we'll do a loop through all the queried json requests.

  

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
              type="date"
              size="md"
              variant="filled"
              placeholder="Check In Date"
              marginRight={10}
            />
            <Input
              type="date"
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
          <div className="filterButton">
            <Menu>
              <MenuButton
                as={Button}
                size="md"
                display="flex"
                rightIcon={<ChevronDownIcon />}
              >
                Sort By: Filter
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
                  />
                </Flex>
                <Flex justifyContent="flex-end" pt={8}>
                  <Button
                    colorScheme="green"
                    type="submit"
                    onClick={() => {
                      searchRef;
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
      {/* <HotelFilter /> */}
      {/*render all hotels, this will be a for loop through the json request later on*/}
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mt="8">
        {hotels.map((hotel, index) => (
          <Hotel
            key={index}
            hotel={hotel}
          />
        ))}
      </Flex>
    </div>
  );
}

export default HomePage;
