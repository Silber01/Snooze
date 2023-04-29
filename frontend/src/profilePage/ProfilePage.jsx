import React, { useContext, Fragment } from "react";
// import './ProfilePage.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";
import image from "../../assets/sampleprofile.png";
import Rewardpoints from "./Rewardpoints";
import Booking from "../components/Booking";
import { isNotPast } from "../intervals";
import Navbar from "../Navbar";
import {
  SimpleGrid,
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
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

  function groupBy(array, size) {
    const groups = [];
    for (let i = 0; i < array.length; i += size) {
      groups.push(array.slice(i, i + size));
    }
    return groups;
  }

  let [currentBookings, setCurrentBookings] = useState([]);
  let [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    const cur =
      bookings?.filter((booking) => {
        const currentDate = booking.lastDate.slice(0, 10);
        return isNotPast(currentDate);
      }) ?? [];

    const past =
      bookings?.filter((booking) => {
        const currentDate = booking.lastDate.slice(0, 10);
        return !isNotPast(currentDate);
      }) ?? [];

    setCurrentBookings(cur);
    setPastBookings(past);
  }, [bookings]);

  return (
    <Flex direction="column" align="center">
      <Image w={150} p={3} src="../../assets/SnoozeLogo.svg" />

      {/* <Box bg="mintgreen" p={4} borderRadius="lg" mt={8} align="center"> */}
      {/* <Image borderRadius="full" boxSize="130px" src={image} alt="" mb={4} /> */}
      {/* have to make onclick route to editprofile */}
      <Button colorScheme="gray" onClick={() => handleClick(props.user._id)}>
        Edit Profile
      </Button>
      {/* </Box> */}

      <Box maxW="xl" mt={12} align="center">
        <Heading size="lg" mb={4}>
          Personal Info
        </Heading>
        <Box fontSize="2xl" fontWeight={500}>
          <Text>Name: {name}</Text>
          <Text mt={4}>Email: {props.user.email}</Text>
        </Box>
      </Box>

      <Box maxW="xl" mt={12} align="center">
        <Heading size="lg" mb={4}>
          Current Bookings
        </Heading>
        {currentBookings &&
          currentBookings.map((booking, index) => (
            <Box key={booking.id} mb={4}>
              <Booking
                hotelId={booking.hotelID}
                checkInDate={booking.firstDate}
                checkOutDate={booking.lastDate}
              />
            </Box>
          ))}
      </Box>

      <Box maxW="xl" mt={12} align="center">
        <Heading size="lg" mb={4}>
          Past Bookings
        </Heading>
        {pastBookings &&
          pastBookings.map((booking, index) => (
            <Box key={booking.id} mb={4}>
              <Booking
                hotelId={booking.hotelID}
                checkInDate={booking.firstDate}
                checkOutDate={booking.lastDate}
              />
            </Box>
          ))}
      </Box>

      <Box maxW="xl" mt={12} align="center">
        <Heading size="lg" mb={4}>
          Rewards
        </Heading>
        <Box bg="darkGray" p={8} borderRadius="lg">
          {/* have to figure out how to get reward points */}
          <Circle
            size="300px"
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
        </Box>
      </Box>
    </Flex>
  );
}

export default ProfilePage;
