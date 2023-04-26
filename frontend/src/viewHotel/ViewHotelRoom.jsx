import React from "react";
import "./ViewHotelRoom.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SnoozeHeader from "../general/SnoozeHeader";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
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
  Center
} from "@chakra-ui/react";

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
  return totalRatings
}


function Review(props) {
  let rating = props.review.rating
  let user = props.review.user
  let review = props.review.review
  return (
    <Box bg="white" width="50%" mb="5">
      <Text>{user}</Text>
      <Box width = "100px">
        <StarRating rating={rating} />
      </Box>
      <p>{review}</p>
    </Box>
  )
}

function ViewHotelRoom() {
  let navigate = useNavigate();
  let params = useParams();
  let apiUrl = import.meta.env.VITE_API_URL;
  let sampleHotel = "643df8f5fae1b05a854b4307";

  let [hotel, setHotel] = useState(null);
  const userData = useContext(UserContext);
  let [rating, setRating] = useState(0)
  let [ratingCount, setRatingCount] = useState(0)
  let [reviews, setReviews] = useState([])
  async function fetchData(hotelID) {
    let apiCall = apiUrl + "/api/hotel/" + hotelID;
    const response = await fetch(apiCall);
    const data = await response.json();
    console.log(data);
    setHotel(data);
  }

  useEffect(() => {
    fetchData(params.id);
  }, []);

  useEffect(() => {
    if (hotel && hotel.ratings)
    {
      setRating(getRating(hotel.ratings))
      setRatingCount(getRatingCount(hotel.ratings))
    }
    if (hotel && hotel.reviews)
    {
      setReviews(hotel.reviews)
      console.log(reviews)
    }
  }, [hotel])
  if (!hotel)
  {
    return (<></>)
  }
  else if (!hotel.name) {
    return <HotelNotFound />;
  }

  return (
    <div className="ViewHotelRoom">
      <SnoozeHeader />
      <Center>
        <Box width="90%" bg="mintgreen" mt="10" pt="5" pb="5">
          <Grid templateColumns="1fr 1fr" pl="5" pr="5">
            <Box>
              <Text fontWeight="bold" fontSize="30" mb="5">{hotel.name}</Text>
              <Text mb="2">{hotel.description}</Text>
              <Box width="225px" mb="10">
                <StarRating rating={rating}/>
                <Text align="center">{rating} stars from {ratingCount} Visitors</Text>
              </Box>
              {reviews.map((review, ind) => {
                return <Review key={ind} review={review} />
              })}
              
            </Box>
            <Box height="600px">
              <Image src={hotel.imgsrc} width="100%" height="100%" objectFit="cover" borderRadius="10px"></Image>
            </Box>
          </Grid>
        </Box>
      </Center>
    </div>
  );
}

export default ViewHotelRoom;
