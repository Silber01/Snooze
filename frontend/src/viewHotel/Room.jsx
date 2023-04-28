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
  MdWifi,
} from "react-icons/md";

function getAvailability(bookedDates, startDate, endDate) {
  return true;
}

function availabilityText(bookedDates, startDate, endDate) {
  if (getAvailability(bookedDates, startDate, endDate)) {
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
}

function Room(props) {
  console.log(props.room);
  let room = props.room;
  return (
    <Grid templateColumns="1fr 1fr 1fr" width="90%" bg="indiepink">
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
            <Text>{availabilityText(1, 2, null)}</Text>
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
              <Text mt="3" textAlign="center">
                ${(room.price * 3 * 1.15).toFixed(2)} for 3 days
              </Text>
              <Text textAlign="center">(+taxes and fees)</Text>
            </Box>
          </>

          <></>
          <Center>
            <Button
              width="40%"
              height="80px"
              border="5px solid"
              borderRadius="20px"
              colorScheme="green"
              borderColor="white"
              onClick={() => {
                props.setChosenRoom(room._id);
              }}
            >
              Book
            </Button>
          </Center>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Room;
