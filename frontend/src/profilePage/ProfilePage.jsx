import React, { useContext, Fragment } from "react";
// import './ProfilePage.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";
import image from "../../assets/sampleprofile.png";
import Rewardpoints from "./Rewardpoints";
import Booking from "../components/Booking";
import { intervalLength, isNotPast } from "../intervals";
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
  Input,
  FormControl,
  FormLabel,
  Stack,
  Image,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import SnoozeHeader from "../general/SnoozeHeader";

function ProfilePage(props) {
  const userContext = useContext(UserContext);
  console.log(userContext);
  const bookings = userContext.bookings;

  const name = `${props.user.firstName} ${props.user.lastName}`;
  const { email } = props;

  const navigate = useNavigate();

  let [isEditing, setEditing] = useState(false);

  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);

  useEffect(() => {
    if (userContext == "NOT LOGGED IN") {
      navigate("/");
    }
  }, [userContext]);

  useEffect(() => {
    props.updateUser();
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

  function handleEditClick() {
    setEditing(!isEditing);
  }

  const handleSave = (event) => {
    console.log("saved");
    event.preventDefault();
    setEditing(false);
  };

  const saveEdit = async () => {
    const bearerToken = "Bearer " + userContext.token;
    const response = await fetch(
      "http://localhost:4000" + "/api/user/editprofile",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
        body: JSON.stringify({
          firstName: firstName != null ? firstName : props.user.firstName,
          lastName: lastName != null ? lastName : props.user.lastName,
        }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log("profile updated!");
    }
    if (!response.ok) {
      console.log("error");
      setError(true);
    }
    window.location.reload(false);
  };

  function handleClick() {
    navigate("/profilepage");
  }
  const [firstNameValid, setFirstNameValid] = useState(true)
  const [lastNameValid, setLastNameValid] = useState(true)
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

          <Button
            onClick={() => {
              handleEditClick();
            }}
            mt={4}
            width="40%"
          >
            Edit profile
          </Button>

          {isEditing ? (
            <FormControl onSubmit={handleSave}>
              <Stack spacing={8} align="center" mt={5}>
                <div>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    isInvalid={!firstNameValid}
                    size="lg"
                    w={500}
                    type="text"
                    defaultValue={props.user.firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value.trim());
                      setFirstNameValid(event.target.value != null &&
                        event.target.value != "")
                    }}
                  />
                </div>
                <div>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    isInvalid={!lastNameValid}
                    size="lg"
                    w={500}
                    type="text"
                    defaultValue={props.user.lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                      setLastNameValid(event.target.value != null &&
                        event.target.value != "")
                    }}
                  />
                </div>
                <Flex mt={7}>
                  <Button
                    type="button"
                    mr={3}
                    colorScheme="green"
                    onClick={() => {
                      if (firstNameValid && lastNameValid)
                        saveEdit()}
                    }
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    colorScheme="red"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Stack>
            </FormControl>
          ) : null}
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
                price={(booking.price * intervalLength(booking.firstDate.substring(0,10), booking.lastDate.substring(0,10)) * 1.15).toFixed(2)}
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
