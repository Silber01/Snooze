import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SnoozeHeader from "../general/SnoozeHeader";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { dateToUnix } from "../intervals";
import HotelNotFound from "../components/HotelNotFound";
import StarRating from "../components/StarRating";

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
} from "@chakra-ui/react";
import Room from "./Room";

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
    <Box bg="white" width="50%" mb="5">
      <Text>{user}</Text>
      <Box width="100px">
        <StarRating rating={rating} />
      </Box>
      <p>{review}</p>
    </Box>
  );
}

function ViewHotelRoom() {
  let navigate = useNavigate();
  let params = useParams();
  let apiUrl = import.meta.env.VITE_API_URL;
  let sampleHotel = "643df8f5fae1b05a854b4307";

  let [hotel, setHotel] = useState(null);
  const userData = useContext(UserContext);
  let [rating, setRating] = useState(0);
  let [ratingCount, setRatingCount] = useState(0);
  let [reviews, setReviews] = useState([]);
  let [chosenRoom, setChosenRoom] = useState(null);
  const [validDates, setValidDates] = useState(true);

  const checkInRef = useRef();
  const checkOutRef = useRef();

  async function fetchData(hotelID) {
    let apiCall = apiUrl + "/api/hotel/getHotel?hotelID=" + hotelID;
    const response = await fetch(apiCall);
    const data = await response.json();
    setHotel(data);
  }

  function checkValidDates() {
    setValidDates(
      dateToUnix(sessionStorage.getItem("checkInDate")) <=
        dateToUnix(sessionStorage.getItem("checkOutDate"))
    );
  }

  useEffect(() => {
    fetchData(params.id);
  }, []);

  useEffect(() => {
    if (chosenRoom != null) {
      console.log("User has chosen room " + chosenRoom);
    }
  });

  useEffect(() => {
    if (hotel && hotel.ratings) {
      setRating(getRating(hotel.ratings));
      setRatingCount(getRatingCount(hotel.ratings));
    }
    if (hotel && hotel.reviews) {
      setReviews(hotel.reviews);
    }
  }, [hotel]);

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
                  <Text align="center">
                    {rating} stars from {ratingCount} Visitors
                  </Text>
                </Box>
                {reviews
                  .slice(0, Math.min(4, reviews.length))
                  .map((review, ind) => {
                    return <Review key={ind} review={review} />;
                  })}
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
              onChange={() => {
                sessionStorage.setItem("checkInDate", checkInRef.current.value);
                checkValidDates();
              }}
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
              onChange={() => {
                sessionStorage.setItem(
                  "checkOutDate",
                  checkOutRef.current.value
                );
                checkValidDates();
              }}
              ref={checkOutRef}
            />
          </Flex>
        </Center>

        <Center mt="10">
          <Box width="90%" bg="mintgreen">
            <Text fontSize="40" textAlign="center" fontWeight="bold">
              Rooms
            </Text>
            {hotel.rooms.map((room, ind) => {
              return (
                <Center mt="5" mb="5">
                  <Room
                    room={room}
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

  function ViewPayment() {
    return (
      <>
        <div className="Payment">
          <Button
            onClick={() => {
              setChosenRoom(null);
            }}
          >
            Back
          </Button>
          <p className="paymentDetails">Payment Details</p>
          <hr></hr>

          <form className="paymentChoice1">
            <label>When would you like to pay?</label>
            <br />
            <input
              type="radio"
              id="payAtProperty"
              name="paymentChoice"
              value="Pay at the property"
            />
            <label for="payAtProperty">Pay at the Property</label>
            <br />
            <input
              type="radio"
              id="payNow"
              name="paymentChoice"
              value="Pay Now"
            />
            <label for="payAtProperty">Pay Now</label>
            <br />
          </form>

          <form className="cardInfo">
            <label className="formLabel" for="firstName">
              First Name<span className="reqField">*</span>
            </label>
            <br />
            <input id="firstName" />
            <br />

            <label className="formLabel" for="lastName">
              Last Name<span className="reqField">*</span>
            </label>
            <br />
            <input id="lastName" />
            <br />

            <label className="formLabel" for="cardNumber">
              Card Number<span className="reqField">*</span>
            </label>
            <br />
            <input id="cardNumber" placeholder="0000 0000 0000 0000" />
            <br />

            <label className="formLabel" for="expDateMM">
              Expiration Date<span className="reqField">*</span>
            </label>
            <br />
            <input id="expDateMM" placeholder="MM" />
            <span className="expDateDivider">/</span>
            <input id="expDateDD" placeholder="DD" />
            <br />

            <label className="formLabel" for="securityCode">
              Security Code<span className="reqField">*</span>
            </label>
            <br />
            <input id="securityCode" placeholder="000" />
          </form>
          <hr></hr>
          <p className="billingAddress">Billing Address</p>

          <form className="addressInfo">
            <div className="addressInfoLine">
              <label className="address1" for="firstName">
                Address
              </label>
              <input
                id="address1"
                type="address"
                placeholder="Address Line 1"
              />
              <br />
            </div>
            <div className="addressInfoLine">
              <label className="address1" for="firstName"></label>
              <input
                id="address2"
                type="address"
                placeholder="Address Line 2"
              />
              <br />
            </div>
            <div className="addressInfoLine">
              <label className="address1" for="firstName">
                City
              </label>
              <input id="city" type="city" placeholder="City" />
              <br />
            </div>
            <div className="addressInfoLine">
              <label className="address1" for="firstName">
                State
              </label>
              <input id="state" type="state" placeholder="State" />
              <br />
            </div>
            <div className="addressInfoLine">
              <label className="address1" for="firstName">
                Zip Code
              </label>
              <input id="zipCode" type="zipCode" placeholder="Zip Code" />
              <br />
            </div>
            <div className="addressInfoLine">
              <label className="address1" for="firstName">
                Country
              </label>
              <input id="country" type="country" placeholder="Country" />
              <br />
            </div>
            {/* No phone entry */}
          </form>

          <p className="pricedetails">Price Details</p>

          <form className="addressInfo">
            <input type="duration" placeholder="1 room x 1 night" />
            <input type="taxes&fees" placeholder="Taxes and Fees" />
            <input type="pointsEarned" placeholder="Points Earned" />
            <input type="totalprice" placeholder="Total Price" />
          </form>

          <button className="update">Update</button>

          <form className="durationInfo">
            <input type="checkin" placeholder="Check-In" />
            <input type="checkout" placeholder="Check-Out" />
          </form>

          <button className="back">Back</button>
          <button className="confirmbooking">Confirm Booking</button>
        </div>
      </>
    );
  }

  if (!hotel) {
    return <></>;
  } else if (!hotel.name) {
    return <HotelNotFound />;
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
        <ViewPayment />
      </div>
    );
  }
}

export default ViewHotelRoom;
