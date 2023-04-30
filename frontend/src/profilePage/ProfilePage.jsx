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
import SnoozeHeader from "../general/SnoozeHeader";

function ProfilePage(props) {
  const userContext = useContext(UserContext);

  const bookings = userContext.bookings;
  const name = `${props.user.firstName} ${props.user.lastName}`;
  const { email } = props;

  const navigate = useNavigate();
  useEffect(() => {
    if (userContext == "NOT LOGGED IN") {
      navigate("/");
    }
  }, [userContext]);

  useEffect(() => {
    props.updateUser();
    console.log(bookings);
  }, []);

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
    console.log(cur);
    console.log(past);
  }, [bookings]);

  function handleClick(id) {
    navigate("/profilepage/" + id);
  }

  return (
    <Box>
      <Navbar />
      <Grid templateColumns="2fr 1fr">
        <Box maxW="xl" mt={12} p="10">
          <Heading size="lg" mt={4} mb={4}>
            Personal Info
          </Heading>
          <Box fontSize="xl" fontWeight="{500}">
            <Text>Name: {name}</Text>
            <Text mt={4}>Email: {props.user.email}</Text>
          </Box>
          <Button onClick={() => {
          handleClick(props.user._id);}} mt={4} width="40%">
            Edit
          </Button>
        </Box>
        <Box mt={12}>
          <Circle
            size="20em"
            borderColor="pink"
            borderWidth="12px"
            color="black"
          >
            <Text textAlign="center" fontWeight="bold" fontSize={22}>
              {userContext.rewardPoints}
              <br />
              Reward points
            </Text>
          </Circle>
        </Box>
      </Grid>
      <Box mt={12} p="10">
        <Heading size="lg" mb={4}>
          Current Bookings
        </Heading>
        {currentBookings &&
          currentBookings.map((booking, index) => (
            <Box key={booking.id} mb={4}>
              <Booking
                key={index}
                hotelId={booking.hotelID}
                checkInDate={booking.firstDate}
                checkOutDate={booking.lastDate}
                bookingID={booking._id}
                price={booking.price}
                isCurrent={true}
              />
            </Box>
          ))}
      </Box>

      <Box p="10">
        <Heading size="lg" mb={4}>
          Past Bookings
        </Heading>
        {pastBookings &&
          pastBookings.map((booking, index) => (
            <Box key={booking.id} mb={4}>
              <Booking
                key={index}
                hotelId={booking.hotelID}
                checkInDate={booking.firstDate}
                checkOutDate={booking.lastDate}
                bookingID={booking._id}
                price={booking.price}
                isCurrent={false}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default ProfilePage;
