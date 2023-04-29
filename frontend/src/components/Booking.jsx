import { useState, useEffect } from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";

function Booking({ hotelId, roomId, checkInDate, checkOutDate, price }) {
  checkInDate = new Date(checkInDate).toLocaleDateString();
  checkOutDate = new Date(checkOutDate).toLocaleDateString();
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
      console.log(data);
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
    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      {bookingConfirmed && (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
          <Text fontWeight="bold" mb={2}>
            {hotelName}
          </Text>
          <Image src={imageURL} alt={hotelName} />
          <Text mb={2}>Hotel Room placeholder.</Text>
          <Text mb={2}>Check-in Date: {checkInDate}</Text>
          <Text mb={2}>Check-out Date: {checkOutDate}</Text>
          <Button onClick={handleViewHotel} colorScheme="blue" mt={4}>
            View Hotel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Booking;
