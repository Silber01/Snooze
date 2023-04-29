import React, { useContext } from "react";
// import './ProfilePage.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";
import image from "../../assets/sampleprofile.png";
import Rewardpoints from "./Rewardpoints";
import Booking from "../components/Booking";
import { isNotPast } from "../intervals";
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Image,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";

function ProfilePage(props) {
  const userContext = useContext(UserContext);
  console.log(userContext);
  const bookings = userContext.bookings;

  const name = `${props.user.firstName} ${props.user.lastName}`;
  const { email } = props;

  const navigate = useNavigate();
  useEffect(() => {
    if (userContext == "NOT LOGGED IN") {
      navigate("/");
    }
  }, [userContext]);

  function handleClick(id) {
    navigate("/profilepage/" + id);
  }

  let [currentBookings, setCurrentBookings] = useState([]);
  let [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    let cur = [];
    let past = [];
    if (bookings) {
      for (let i = 0; i < bookings.length; i++) {
        let currentDate = bookings[i].lastDate.slice(0, 10);
        console.log(currentDate);
        if (isNotPast(currentDate)) {
          cur.push(bookings[i]);
        } else {
          past.push(bookings[i]);
        }
      }
    }
    setCurrentBookings(cur);
    setPastBookings(past);
  }, [bookings]);

  return (
    <>
      <Image w={150} p={3} ml={3} src="../../assets/SnoozeLogo.svg"></Image>

      <Box bg="mintgreen" p={4} align="center">
        <Image borderRadius="full" boxSize="130px" src={image} alt="" />
        {/* have to make onclick route to editprofile */}
        <Button
          onClick={() => {
            handleClick(props.user._id);
          }}
          mt={4}
          colorScheme="gray"
        >
          Edit Profile
        </Button>
      </Box>

      <Heading ml={20} mt={10} size="lg" align="center">
        Personal Info
      </Heading>
      <Box p={4} ml={40} mt={4} fontSize="2xl" fontWeight={500} align="center">
        <Text>Name: {name}</Text>
        <Text mt={5}>Email: {props.user.email}</Text>
      </Box>

      <Heading ml={20} mt={12} size="lg">
        Current Bookings
      </Heading>
      {/* {"These are the acutal current bookings. Keep this."} */}
      {currentBookings &&
        currentBookings.map((booking, index) => (
          <div key={booking.id}>
            <Booking
              hotelId={booking.hotelID}
              checkInDate={booking.firstDate}
              checkOutDate={booking.lastDate}
            />
          </div>
        ))}

      <Heading ml={20} mt={12} size="lg">
        Past Bookings
      </Heading>
      {/* current bookings, when we figure out past bookings change this" */}
      {pastBookings &&
        pastBookings.map((booking, index) => (
          <div key={booking.id}>
            <Booking
              hotelId={booking.hotelID}
              checkInDate={booking.firstDate}
              checkOutDate={booking.lastDate}
            />
          </div>
        ))}
      <Heading ml={20} mt={12} size="lg">
        Rewards
      </Heading>
      <Box bg="darkGray" mt={5} ml={40} w="35em" h="40em">
        {/* have to figure out how to get reward points */}
        <Flex justifyContent="center" alignItems="center">
          <Circle
            mt={10}
            size="20em"
            borderColor="pink"
            borderWidth="12px"
            color="black"
          >
            <Text textAlign="center" fontWeight="bold" fontSize={22}>
              100000
              <br />
              Rewards points
            </Text>
          </Circle>
        </Flex>
      </Box>
    </>
  );
}

export default ProfilePage;
