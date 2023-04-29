import { intervalLength } from "../intervals";
import { useState, useEffect } from "react";
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
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  MdBed,
  MdCheck,
  MdQuestionMark,
  MdSettings,
  MdWarning,
  MdWifi,
} from "react-icons/md";

function BookButton({ validDates, isColliding, setChosenRoom, roomID }) {
  if (!validDates || isColliding) {
    return (
      <Button
        width="40%"
        height="80px"
        border="3px solid"
        borderRadius="20px"
        backgroundColor="#999999"
        borderColor="white"
        textColor="white"
        cursor="not-allowed"
      >
        Book
      </Button>
    );
  }
  return (
    <Button
      width="40%"
      height="80px"
      border="3px solid"
      borderRadius="20px"
      backgroundColor="#c6c1dc"
      borderColor="white"
      textColor="white"
      onClick={() => {
        setChosenRoom(roomID);
      }}
    >
      Book
    </Button>
  );
}

function RoomPrice({ price, duration }) {
  if (duration > 0) {
    return (
      <>
        <Text mt="3" textAlign="center">
          ${(price * duration * 1.15).toFixed(2)} for {duration} days
        </Text>
        <Text textAlign="center">(+taxes and fees)</Text>
      </>
    );
  }
  return (
    <>
      <Text></Text>
      <Text></Text>
    </>
  );
}

function Room(props) {
  let [isColliding, setIsColliding] = useState(false);
  async function checkCollision(
    hotelID,
    roomID,
    firstDate,
    lastDate
  ) {
    let apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(
      apiUrl +
        "/api/hotel/checkHotel?hotelID=" +
        hotelID +
        "&roomID=" +
        roomID +
        "&firstDate=" +
        firstDate +
        "&lastDate=" +
        lastDate
    );
    const data = await response.json();
    console.log(data);
    setIsColliding(!Boolean(data.valid && data.valid == true));
  }

  function availabilityText() {
    let validDates = props.validDates
    let startDate = sessionStorage.getItem("checkInDate")
    let endDate = sessionStorage.getItem("checkOutDate")
    if (!isColliding) {
      console.log("valid hotel!");
      if (!validDates) {
        return (
          <HStack>
            <Icon as={MdWarning} boxSize="10" color="red" />
            <Text fontSize="20" color="red">
              Your inputted dates are invalid.
            </Text>
          </HStack>
        );
      }
      if (!startDate || !endDate) {
        return (
          <HStack>
            <Icon as={MdQuestionMark} boxSize="10" />
            <Text fontSize="20">
              Input your check-in and check-out times to see if this room is
              available
            </Text>
          </HStack>
        );
      }
      return (
        <HStack>
          <Icon as={MdCheck} boxSize="10" color="green" />
          <Text fontSize="20" color="green">
            This room is available for your stay.
          </Text>
        </HStack>
      );
    }
    return (
      <HStack>
        <Icon as={MdWarning} boxSize="10" color="red" />
        <Text fontSize="20" color="red">
          This room is booked during this stay.
        </Text>
      </HStack>
    );
  }

  useEffect(() => {
    checkCollision(props.hotelID,
      room._id,
      sessionStorage.getItem("checkInDate"),
      sessionStorage.getItem("checkOutDate"),
      props.validDates)
  }, [props.duration])

  let room = props.room;
  return (
    <Grid
      templateColumns="1fr 1fr 1fr"
      width="90%"
      bg="indiepink"
      border="3px solid"
      borderColor="white"
    >
      <Box p="5">
        <Image
          width="100%"
          height="400px"
          objectFit="cover"
          src={room.imgsrc}
        ></Image>
        <Text textAlign="center" fontWeight="bold" fontSize="30">
          {room.roomType}
        </Text>
      </Box>
      <Box p="5">
        <Grid height="400px" templateRows="1fr 5fr 1fr" mt="5">
          <Box>
            <HStack>
              <Icon as={MdBed} boxSize="10" />
              <Text>{room.beds} beds</Text>
            </HStack>

            <HStack>
              <Icon as={MdWifi} boxSize="10" />
              <Text>{room.hasWifi ? "Has WiFi" : "Does not have WiFi"}</Text>
            </HStack>
          </Box>
          <Box />
          <Box>
            <Text>
              {availabilityText()}
            </Text>
          </Box>
        </Grid>
      </Box>
      <Box p="5">
        <Grid height="400px" templateRows="1fr 5fr 1fr" mt="5">
          <>
            <Center>
              <Flex>
                <Text textAlign="center" fontWeight="bold" fontSize="40">
                  ${room.price}
                </Text>
                <Text mt="6">/day</Text>
              </Flex>
            </Center>
            <Box>
              <RoomPrice price={room.price} duration={props.duration} />
            </Box>
          </>

          <></>
          <Center>
            <BookButton
              validDates={props.validDates}
              isColliding={isColliding}
              setChosenRoom={props.setChosenRoom}
              roomID={room._id}
            />
          </Center>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Room;
