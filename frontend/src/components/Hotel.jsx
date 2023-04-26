import { Box, Button, Text, Image, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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

function getStar(rating, place) {
  let thisRating = rating - place + 0.00001;
  if (thisRating <= 0) return 0;
  else if (thisRating >= 1) return 10;
  return ("" + thisRating * 10).substring(0, 1);
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

function Hotel({ hotel }) {
  const navigate = useNavigate();
  let rating = getRating(hotel.ratings);
  return (
    <Box
      border="1px"
      borderColor="black"
      w={["90vw", "80vw", "400px"]}
      h={["90vw", "80vw", "400px"]}
      bg="gray.200"
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
      <Grid templateColumns="repeat(5, 1fr)" gap={1} mt={4}>
        <Image
          src={"../../assets/stars/" + getStar(rating, 0) + ".png"}
          width="30px"
        />
        <Image
          src={"../../assets/stars/" + getStar(rating, 1) + ".png"}
          width="30px"
        />
        <Image
          src={"../../assets/stars/" + getStar(rating, 2) + ".png"}
          width="30px"
        />
        <Image
          src={"../../assets/stars/" + getStar(rating, 3) + ".png"}
          width="30px"
        />
        <Image
          src={"../../assets/stars/" + getStar(rating, 4) + ".png"}
          width="30px"
        />
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
        <Button
          colorScheme="green"
          onClick={() => {
            handleRedirect(navigate, hotel._id);
          }}
        >
          Book
        </Button>
      </Grid>
    </Box>
  );
}

export default Hotel;
