import {
  Box,
  Button,
  Text,
  Image,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

function getLocation(location) {
  let locationList = [];
  if (location.address) locationList.push(location.address);
  if (location.city) locationList.push(location.city);
  if (location.province) locationList.push(location.province);
  if (location.country) locationList.push(location.country);
  let ans = "";
  locationList.forEach((loc, ind) => {
    ans += loc;
    if (ind != locationList.length - 1) ans += ", ";
  });
  return ans;
}

function getRating(ratings) {
  let avg = 0;
  let totalRatings = 0;
  for (const [key, value] of Object.entries(ratings)) {
    avg += key * value;
    totalRatings += value;
  }
  return (avg / totalRatings).toFixed(1);
}

function getStartingPrice(rooms) {
  let minPrice = Infinity;
  rooms.forEach((room, ind) => {
    minPrice = Math.min(minPrice, room.price);
  });
  return minPrice;
}

function handleRedirect(navigate, id) {
  navigate("/hotel/" + id);
}

function GetBookButton(props) {
  if (props.isValid) {
    return (
      <Button
        colorScheme="green"
        onClick={() => {
          handleRedirect(props.navigate, props.id);
        }}
      >
        Book
      </Button>
    );
  }
  return (
    <Button colorScheme="gray" color="#888888">
      Book
    </Button>
  );
}

function Hotel(props) {
  let hotel = props.hotel;
  let canBook = props.canBook;
  console.log(hotel);
  const navigate = useNavigate();
  let rating = getRating(hotel.ratings);
  return (
    <Box
      border="1px"
      borderColor="#9A9A9A"
      w={["90vw", "80vw", "400px"]}
      h={["90vw", "80vw", "400px"]}
      bg="white.200"
      m="3"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      maxW="100%"
    >
      <Image
        src={hotel.imgsrc}
        width="90%"
        height="60%"
        borderRadius="20px"
        objectFit="cover"
      />
      <Text fontWeight="bold">{hotel.name}</Text>
      <Text>{getLocation(hotel.location)}</Text>
      <Grid templateColumns="5fr 1fr" mt="4">
        <StarRating rating={rating} />
        <Center>
          <Box>
            <Text fontWeight="bold">{rating}</Text>
          </Box>
        </Center>
      </Grid>

      <Grid mt={4} templateColumns="2fr 1fr" gap={1}>
        <Box margin="auto">
          <Text as="span" margin="auto">
            Starting At{" "}
          </Text>
          <Text fontWeight="bold" fontSize="1.2em" as="span">
            ${getStartingPrice(hotel.rooms)}
          </Text>
        </Box>

        <GetBookButton isValid={canBook} id={hotel._id} navigate={navigate} />
      </Grid>
    </Box>
  );
}

export default Hotel;
