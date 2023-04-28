import { useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Flex,
    Input,
    Text,
    VStack,
    Heading,
    Button,
    Divider,
    HStack,
    propNames,
    Box,
    Center
  } from "@chakra-ui/react";

  function goHome(navigate) {
    navigate("/home")
  }

  function Receipt({checkIn, checkOut, hotel, pricePaid, roomType,
firstName, lastName, address1, address2, city, state, zipCode, country}) {
    let navigate = useNavigate();
    return (
        <Box>
            <Text>{checkIn}</Text>
            <Text>{checkOut}</Text>
            <Text>{pricePaid}</Text>
            <Text>{hotel}</Text>
            <Text>{roomType}</Text>
            <Text>{firstName}</Text>
            <Text>{lastName}</Text>
            <Text>{address1}</Text>
            <Text>{address2}</Text>
            <Text>{city}</Text>
            <Text>{state}</Text>
            <Text>{zipCode}</Text>
            <Text>{country}</Text>
            <Button onClick={() => {goHome(navigate)}}>Go to Home</Button>
        </Box>
    )
  }

  export default Receipt;