import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SnoozeHeader from "../general/SnoozeHeader";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { dateToUnix, intervalLength, isNotPast } from "../intervals";
import HotelNotFound from "../components/HotelNotFound";
import StarRating from "../components/StarRating";
import Hotel from "../components/Hotel";

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
  Grid,
  Spacer,
  Center,
  Divider,
  Input,
  HStack,
} from "@chakra-ui/react";
import Room from "./Room";
import Payment from "../payment/Payment";

function getRating(ratings) {
  let avg = 0;
  let totalRatings = 0;
  for (const [key, value] of Object.entries(ratings)) {
    avg += key * value;
    totalRatings += value;
  }
  return (avg / totalRatings).toFixed(1);
}

function getRatingCount(ratings) {
  let totalRatings = 0;
  for (const [key, value] of Object.entries(ratings)) {
    totalRatings += value;
  }
  return totalRatings;
}

function Review(props) {
  let rating = props.review.rating;
  let user = props.review.user;
  let review = props.review.review;
  return (
    <Box border="Gray.500" rounded="xl" width="90%" mb="5" borderWidth={4}>
      <Text>{user}</Text>
      <Box width="100px" ml={2} mt={2}>
        <StarRating rating={rating} />
      </Box>
      <Text p={2} mt={2}>
        {review}
      </Text>
    </Box>
  );
}

function ViewHotelRoom() {
  let navigate = useNavigate();
  let params = useParams();
  let apiUrl = import.meta.env.VITE_API_URL;
  let sampleHotel = "643df8f5fae1b05a854b4307";
  let [roomPrice, setRoomPrice] = useState(0);
  let [roomType, setRoomType] = useState("");

  let [hotel, setHotel] = useState(null);
  const userData = useContext(UserContext);
  let [rating, setRating] = useState(0);
  let [ratingCount, setRatingCount] = useState(0);
  let [reviews, setReviews] = useState([]);
  let [chosenRoom, setChosenRoom] = useState(null);
  let [datesWrong, setDatesWrong] = useState(false);
  let [collides, setCollides] = useState(false);
  const [validDates, setValidDates] = useState(true);
  let [duration, setDuration] = useState(0);
  const [startDate, setStartDate] = useState(
    sessionStorage.getItem("checkInDate")
  );
  const [endDate, setEndDate] = useState(
    sessionStorage.getItem("checkOutDate")
  );

  const checkInRef = useRef();
  const checkOutRef = useRef();

  async function fetchData(hotelID) {
    let apiCall = apiUrl + "/api/hotel/getHotel?hotelID=" + hotelID;
    const response = await fetch(apiCall);
    const data = await response.json();
    setHotel(data);
  }

  async function checkCollision() {
    if (!startDate || !endDate) {
      return;
    }
    console.log(userData);
    const bearerToken = "Bearer " + userData.token;
    console.log(bearerToken);
    const apiReq =
      apiUrl +
      "/api/user/checkCollisions?firstDate=" +
      startDate +
      "&lastDate=" +
      endDate;
    console.log("Api request: " + apiReq);
    const response = await fetch(apiReq, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.valid) {
      console.log("Does not collide");
      setCollides(false);
    } else {
      console.log("collides");
      setCollides(true);
    }
  }

  function datesMakeSense() {
    setDatesWrong(
      !Boolean(
        startDate != null &&
          endDate != null &&
          isNotPast(startDate) &&
          isNotPast(endDate) &&
          intervalLength(startDate, endDate) > 0
      )
    );
  }

  function checkValidDates() {
    datesMakeSense();
    try {
      checkCollision();
    } catch (error) {
      console.log("Collision Check Error");
    }
  }

  useEffect(() => {
    fetchData(params.id);
    checkValidDates();
  }, []);

  useEffect(() => {
    console.log("collides: " + collides);
    console.log("dates wrong: " + datesWrong);
    if (!collides && !datesWrong) {
      setValidDates(true);
      setDuration(intervalLength(startDate, endDate));
    } else {
      setValidDates(false);
      setDuration(0);
    }
  }, [collides, datesWrong]);

  // useEffect(() => {
  //   if (chosenRoom != null) {
  //     console.log("User has chosen room " + chosenRoom);
  //   }
  // });

  useEffect(() => {
    if (hotel && hotel.ratings) {
      setRating(getRating(hotel.ratings));
      setRatingCount(getRatingCount(hotel.ratings));
    }
    if (hotel && hotel.reviews) {
      setReviews(hotel.reviews);
    }
  }, [hotel]);

  useEffect(() => {
    if (hotel && hotel.rooms) {
      findRoom();
    }
  }, [chosenRoom]);

  useEffect(() => {
    checkValidDates();
  }, [startDate, endDate]);

  function roomsForText() {
    if (!startDate || !endDate) return "Rooms";

    return (
      "Rooms for " +
      startDate.replaceAll("-", "/") +
      " - " +
      endDate.replaceAll("-", "/")
    );
  }

  function ErrorText() {
    if (!isNotPast(startDate) || !isNotPast(endDate)) {
      return (
        <Text color="red" fontSize="20">
          You can't make reservations for the past!
        </Text>
      );
    } else if (datesWrong) {
      return (
        <Text color="red" fontSize="20">
          Your check-in time must be before your check-out time.
        </Text>
      );
    } else if (collides) {
      return (
        <Text color="red" fontSize="20">
          You already have a booking during this time!
        </Text>
      );
    }
    return <></>;
  }

  function ViewHotels() {
    return (
      <>
        <Center>
          <Box width="90%" bg="mintgreen" mt="10" pt="5" pb="5">
            <Grid templateColumns="1fr 1fr" pl="5" pr="5">
              <Box>
                <Text fontWeight="bold" fontSize="30" mb="5">
                  {hotel.name}
                </Text>
                <Text mb="2">{hotel.description}</Text>
                <Box width="225px" mb="10">
                  <StarRating rating={rating} />
                  <Text mt={2} align="center">
                    {rating} stars from {ratingCount} Visitors
                  </Text>
                </Box>
                <Flex
                  direction="column"
                  maxHeight="400px"
                  overflowY="scroll"
                  mr="5"
                  padding="1"
                  borderColor="#eeeeee"
                  borderWidth="3px"
                  borderRadius="3px"
                >
                  {reviews.map((review, ind) => {
                    return <Review key={ind} review={review} />;
                  })}
                </Flex>
              </Box>
              <Box height="600px">
                <Image
                  src={hotel.imgsrc}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  borderRadius="10px"
                ></Image>
              </Box>
            </Grid>
          </Box>
        </Center>

        <Center>
          <Flex width="60%">
            <Input
              width="50%"
              type="date"
              size="lg"
              top={5}
              variant="filled"
              placeholder="Check In Date"
              marginRight={10}
              isInvalid={!validDates}
              defaultValue={sessionStorage.getItem("checkInDate")}
              ref={checkInRef}
            />
            <Input
              width="50%"
              type="date"
              size="lg"
              top={5}
              variant="filled"
              placeholder="Check Out Date"
              marginRight={10}
              isInvalid={!validDates}
              defaultValue={sessionStorage.getItem("checkOutDate")}
              ref={checkOutRef}
            />
            <Button
              size="lg"
              top={5}
              onClick={() => {
                sessionStorage.setItem("checkInDate", checkInRef.current.value);
                sessionStorage.setItem(
                  "checkOutDate",
                  checkOutRef.current.value
                );
                setStartDate(checkInRef.current.value);
                setEndDate(checkOutRef.current.value);
              }}
            >
              Set
            </Button>
          </Flex>
        </Center>
        <Box width="100%" mt="8">
          <Center>
            <ErrorText />
          </Center>
        </Box>

        <Center mt="10">
          <Box width="90%" bg="mintgreen">
            <Text fontSize="40" textAlign="center" fontWeight="bold">
              {roomsForText()}
            </Text>
            {hotel.rooms.map((room, ind) => {
              return (
                <Center mt="5" mb="5">
                  <Room
                    hotelID={hotel._id}
                    room={room}
                    duration={duration}
                    key={ind}
                    setChosenRoom={setChosenRoom}
                    validDates={validDates}
                  />
                </Center>
              );
            })}
          </Box>
        </Center>
      </>
    );
  }
  function findRoom() {
    hotel.rooms.forEach((element) => {
      console.log(element);
      if (element._id == chosenRoom) {
        setRoomPrice(element.price);
        setRoomType(element.roomType);
      }
    });
  }
  if (!hotel) {
    return <></>;
  } else if (!hotel.name) {
    return (
      <HotelNotFound
        displayNavbar={true}
        displayReturnToHome={true}
        displayImage={true}
      />
    );
  }
  if (!chosenRoom) {
    return (
      <div className="ViewHotelRoom">
        <SnoozeHeader />
        <ViewHotels />
      </div>
    );
  } else {
    return (
      <div>
        <SnoozeHeader />
        <Payment
          hotelID={hotel._id}
          roomID={chosenRoom}
          checkIn={sessionStorage.getItem("checkInDate")}
          checkOut={sessionStorage.getItem("checkOutDate")}
          hotel={hotel.name}
          roomType={roomType}
          price={roomPrice}
          setChosenRoom={setChosenRoom}
        />
        {/*<ViewPayment />*/}
      </div>
    );
  }
}

export default ViewHotelRoom;
