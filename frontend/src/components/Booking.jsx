import { useState, useEffect } from "react";
import { Box, Text, Button, Image, Grid, Heading } from "@chakra-ui/react";


function makeDateString(datestr)
{
  let newDate = new Date(datestr)
  newDate.setDate(newDate.getDate() + 1)
  return newDate.toLocaleDateString()
}

function Booking({
  hotelId,
  roomId,
  checkInDate,
  checkOutDate,
  price,
  isCurrent,
}) {
  
  checkInDate = makeDateString(checkInDate)
  checkOutDate = makeDateString(checkOutDate)
  const [bookingConfirmed, setBookingConfirmed] = useState(true);
  const [hotelName, setHotelName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [roomType, setRoomType] = useState("");
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

  return (
    <Box borderWidth="1px" borderRadius="lg" borderColor="#999999" overflow="hidden" p={4} mr="40" bg="#eeeeee">
      {bookingConfirmed && (
        <Box borderWidth="1px" borderRadius="lg" borderColor="#999999" overflow="hidden" p={4}>
          <Heading fontWeight="bold" mb={2}>
            {hotelName}
          </Heading>
          <Grid templateColumns="2fr 1fr">
          <Box>
            <Text fontSize="25" mb={2}>Check-in Date: {checkInDate}</Text>
            <Text fontSize="25" mb={2}>Check-out Date: {checkOutDate}</Text>
            <Text fontSize="25" mb={2}>Price Paid: ${price}</Text>
          </Box>
          <Image src={imageURL} alt={hotelName} width="100%" height="400px" objectFit="cover" borderRadius="10px"/>
          </Grid>
          <Button onClick={handleViewHotel} colorScheme="blue" mt={4} mr={2}>
            View Hotel
          </Button>
          {isCurrent && (
            <Button colorScheme="red" mt={4} mr={2}>
              Cancel Booking
            </Button>
          )}
          {!isCurrent && (
            <Button colorScheme="green" mt={4} mr={2}>
              Add Review
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Booking;
