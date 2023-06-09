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
  Center,
  Flex,
} from "@chakra-ui/react";
import { UserContext } from "../../context/UserContext";
import Ratings from "../ratings/Ratings";
import StarRating from "./StarRating";

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
  const [hasReviewed, setHasReviewed] = useState(false);
  const [revInfo, setRevInfo] = useState([0, ""]);

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

  useEffect(() => {
    let reviews = userContext.reviews;
    reviews.forEach((rev) => {
      if (rev.hotelId == hotelId) setHasReviewed(true);
      setRevInfo([rev.rating, rev.review]);
    });
  }, []);

  const handleViewHotel = () => {
    window.location.href = `http://localhost:3000/hotel/${hotelId}`;
  };
  const ratingRef = useRef();
  const reviewRef = useRef();

  const submitReview = async (ratingValue, reviewText) => {
    /** addRating
     * hotelID: hotelId
     * rating: ratingValue
     */

    /** addReview
     * if returns REVIEW ALREADY EXISTS, do not render the review text box on this
     * else: render the text box for the reivew and then make the api call with the review
     */

    const bearerToken = "Bearer " + userContext.token;
    const response = await fetch(
      "http://localhost:4000" + "/api/hotel/review",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
        body: JSON.stringify({
          hotelId: hotelId,
          rating: Math.max(ratingRef.current.value, 1),
          review: reviewRef.current.value,
          name: userContext.firstName + " " + userContext.lastName,
        }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log("review added!");
    }
    if (!response.ok) {
      console.log("error");
    }
    window.location.reload(false);
  };
  function ReviewBox() {
    const [rating, setRating] = useState(0);
    if (isCurrent) return <></>;
    if (hasReviewed) {
      return (
        <Box
          width="80%"
          minHeight="50%"
          borderColor="#aaaaaa"
          borderWidth="1px"
          borderRadius="10px"
          p="5"
        >
          <Box width="15em">
            <StarRating rating={revInfo[0]} />
          </Box>
          <Box pt="5">
            <Text fontSize="20">{revInfo[1]}</Text>
          </Box>
        </Box>
      );
    }
    function SubmitRating() {
      if (rating != 0) {
        return (
          <Button
            minWidth="130px"
            background="#c6c1dc"
            mt={10}
            size="lg"
            textColor="white"
            onClick={() =>
              submitReview(ratingRef.current.value, reviewRef.current.value)
            }
          >
            Submit Review
          </Button>
        );
      }
      return (
        <Button
          colorScheme="blackAlpha"
          mt={10}
          size="lg"
          cursor="not-allowed"
          minWidth="130px"
        >
          Submit Review
        </Button>
      );
    }
    return (
      <div>
        <Box width="70%" height="8%" mt={10}>
          <Box>
            <Textarea
              borderColor="#33333"
              placeholder="Write a review here."
              fontSize="3xl"
              w="100%"
              h="20vh"
              size="lg"
              type="text"
              ref={reviewRef}
              onChange={() => {
                setRating(ratingRef.current.value);
              }}
            />
            <Grid width="80%" templateColumns="2fr 1fr">
              <Ratings
                size={60}
                scale={5}
                fillColor="gold"
                strokeColor="grey"
                ref={ratingRef}
                rating={rating}
                setRating={setRating}
              />

              <SubmitRating />
            </Grid>
          </Box>
        </Box>
      </div>
    );
  }

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
              <ReviewBox />
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
            <Box
              borderWidth="1px"
              borderColor="#aaaaaa"
              width="50%"
              mt="5"
              p="5"
            >
              <VStack>
                <Heading size="lg">Are you sure?</Heading>
                <Text textAlign="center">
                  You will only be refunded ${(price * 0.75).toFixed(2)}
                </Text>
                <Text textAlign="center">
                  (75% of what you originally paid)
                </Text>
                <Flex>
                  <Button colorScheme="red" m="5" onClick={handleCancelBooking}>
                    Confirm Cancellation
                  </Button>
                  <Button
                    colorScheme="blackAlpha"
                    m="5"
                    onClick={() => {
                      setCancelButtonText(false);
                    }}
                  >
                    Do Not Cancel
                  </Button>
                </Flex>
              </VStack>
            </Box>
          )}
          {/* {!isCurrent && (
            <Button
              colorScheme="green"
              mt={4}
              mr={2}
              onClick={() => setReviewing(true)}
            >
              Add Review
            </Button>
          )} */}
        </Box>
      )}
    </Box>
  );
}

export default Booking;
