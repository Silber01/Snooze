import { Flex, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import image from "../../assets/sampleprofile.png";
import Navbar from "../Navbar";

const HotelNotFound = () => {
  return (
    <>
      <Navbar />
      <Flex
        alignItems="center"
        justifyContent="center"
        height="70vh"
        flexDirection="column"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="gray.500"
          textAlign="center"
        >
          Sorry, we couldn't find any hotels that match your search criteria.
        </Text>
        <Image w={500} p={3} ml={3} src={image}></Image>
        <Link to="/home">
          <Button colorScheme="blue">Return to Home</Button>
        </Link>
      </Flex>
    </>
  );
};

export default HotelNotFound;
