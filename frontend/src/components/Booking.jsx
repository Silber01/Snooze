import { useContext, useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Grid,
  Heading,
  Input,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { UserContext } from "../../context/UserContext";
import Ratings from "../ratings/Ratings";

function makeDateString(datestr) {
  let newDate = new Date(datestr);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toLocaleDateString();
}

function Booking({
  hotelId,
  roomId,
  checkInDate,
  checkOutDate,
  price,
  isCurrent,
  bookingID,
}) {
  const userContext = useContext(UserContext);

  checkInDate = makeDateString(checkInDate);
  checkOutDate = makeDateString(checkOutDate);
  const [bookingConfirmed, setBookingConfirmed] = useState(true);
  const [hotelName, setHotelName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [roomType, setRoomType] = useState("");
  const [confirmCancel, setCancelButtonText] = useState(false);
  const [isReviewing, setReviewing] = useState(false);

  function showCancelConfirmation() {
    setCancelButtonText(true);
  }

  const handleCancelBooking = async () => {
    const bearerToken = "Bearer " + userContext.token;
    console.log(bookingID, bearerToken);
    // get reward points from this booking, remove them from the users account
    const response = await fetch(
      "http://localhost:4000" + "/api/user/cancelbooking",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
        body: JSON.stringify({
          userBookingID: bookingID,
        }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log("booking removed!");
    }
    if (!response.ok) {
      console.log("error");
    }
    window.location.reload(false);
  };

  let data = {};
  useEffect(() => {
    const fetchHotel = async () => {
      const response = await fetch(
        `http://localhost:4000/api/hotel/getHotel?hotelID=${hotelId}`
      );
      data = await response.json();
      // not sure how to find the room type
      const selectedRoom = data.rooms.find((room) => room._id === roomId);

      //   if (selectedRoom) {
      setBookingConfirmed(true);
      setHotelName(data.name);
      setImageURL(data.imgsrc);
      //   setRoomType(selectedRoom.roomType);
    };

    fetchHotel();
  }, [hotelId, roomId]);

  const handleViewHotel = () => {
    window.location.href = `http://localhost:3000/hotel/${hotelId}`;
  };
  const ratingRef = useRef();
  const reviewRef = useRef();

  const submitReview = async (ratingValue, reviewText) => {
    console.log("token: ", userContext.token);
    console.log("userId: ", userContext._id);
    console.log("body: ", reviewText);
    console.log("id: ", hotelId);
    console.log("rating: ", ratingValue);

    /** addRating
     * hotelID: hotelId
     * rating: ratingValue
     */

    /** addReview
     * if returns REVIEW ALREADY EXISTS, do not render the review text box on this
     * else: render the text box for the reivew and then make the api call with the review
     */

    // const bearerToken = "Bearer " + userContext.token;
    // const response = await fetch("http://localhost:4000" + "api/hotel/rating", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: bearerToken,
    //   },
    //   body: JSON.stringify({
    //     body: reviewText,
    //     id: hotelId,
    //     userId: userContext.id,
    //     rating: ratingValue,
    //   }),
    // });
    // const json = await response.json();
    // if (response.ok) {
    //   console.log("rating added!");
    // }
    // if (!response.ok) {
    //   console.log("error");
    // }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="#999999"
      overflow="hidden"
      p={4}
      mr="40"
      bg="#eeeeee"
    >
      {bookingConfirmed && (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          borderColor="#999999"
          overflow="hidden"
          p={4}
        >
          <Heading fontWeight="bold" mb={2}>
            {hotelName}
          </Heading>
          <Grid templateColumns="2fr 1fr">
            <Box>
              <Text fontSize="25" mb={2}>
                Check-in Date: {checkInDate}
              </Text>
              <Text fontSize="25" mb={2}>
                Check-out Date: {checkOutDate}
              </Text>
              <Text fontSize="25" mb={2}>
                Price Paid: ${price}
              </Text>
            </Box>
            <Image
              src={imageURL}
              alt={hotelName}
              width="100%"
              height="400px"
              objectFit="cover"
              borderRadius="10px"
            />
          </Grid>
          <Button onClick={handleViewHotel} colorScheme="blue" mt={4} mr={2}>
            View Hotel
          </Button>
          {isCurrent && (
            <Button
              colorScheme="red"
              mt={4}
              mr={2}
              onClick={showCancelConfirmation}
            >
              Cancel Booking
            </Button>
          )}
          {confirmCancel && (
            <Button
              colorScheme="red"
              mt={4}
              mr={2}
              onClick={handleCancelBooking}
            >
              Confirm Cancellation
            </Button>
          )}
          {!isCurrent && (
            <Button
              colorScheme="green"
              mt={4}
              mr={2}
              onClick={() => setReviewing(true)}
            >
              Add Review
            </Button>
          )}

          {isReviewing && (
            <div>
              <Box width="90%" height="8%" mt={10}>
                <Box>
                  <Textarea
                    borderColor="#33333"
                    placeholder="Write a review here."
                    fontSize="3xl"
                    w="70vw"
                    h="20vh"
                    size="lg"
                    type="text"
                    ref={reviewRef}
                  />
                  <Grid width="50%" templateColumns="2fr 1fr">
                  <Ratings
                    size={60}
                    scale={5}
                    gap={1}
                    fillColor="gold"
                    strokeColor="grey"
                    ref={ratingRef}
                  />
                  <Button
                    background="#c6c1dc"
                    mt={10}
                    size="lg"
                    textColor="white"
                    onClick={() =>
                      submitReview(
                        ratingRef.current.value,
                        reviewRef.current.value
                      )
                    }
                  >
                    Submit Review
                  </Button>
                  </Grid>
                </Box>
              </Box>
            </div>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Booking;
