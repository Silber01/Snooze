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
  Center,
} from "@chakra-ui/react";

function goHome(navigate) {
  navigate("/home");
}

function Receipt({
  checkIn,
  checkOut,
  hotel,
  pricePaid,
  roomType,
  firstName,
  lastName,
  address1,
  address2,
  city,
  state,
  zipCode,
  country,
}) {
  let navigate = useNavigate();
  return (
    <Box>
      {/* the green "Your Room is Booked" box */}
      <Center mt="10">
        <VStack gap={4} border={"5px solid #C1DCC6"} height="35%" width="100%">
          <Text fontWeight="bold" fontSize="4xl" textColor="#33333">
            Your Room is Booked!
          </Text>

          <Text fontWeight="medium" fontSize="3xl" textColor="#33333">
            ORDER CONFIRMATION
          </Text>
          <Text fontWeight="light" fontSize="3xl" textColor="#33333">
            Thank you for booking with Snooze. An email with your full
            confimation order is on its way!
          </Text>
        </VStack>
      </Center>
      <Box>
        {/* order summary text only */}
        <Center mt="10">
          <Text fontWeight="medium" fontSize="3xl">
            ORDER SUMMARY
          </Text>
        </Center>

        {/* green payment box */}
        <Center mt="10">
          <Box backgroundColor="#C1DCC6" width="55%">
            {/* left side, billing info */}
            <Center justifyContent="space-between">
              <Box>
                <Text fontWeight="bold" fontSize="4xl">
                  BILLING
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {firstName}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {lastName}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {address1}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {address2}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {city}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {state}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {zipCode}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {country}
                </Text>
              </Box>
            </Center>
            {/* border divider */}
            <Center height={300} mt="10">
              <Divider
                border={"2px solid"}
                borderColor="black.200"
                orientation="vertical"
              />
            </Center>
            {/* left side, billing info */}
            <Center
              justifyContent="flex-start"
              position="absolute"
              right={1000}
              bottom={500}
            >
              <Box>
                <Text fontWeight="bold" fontSize="4xl">
                  ORDER INFORMATION
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {hotel}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {roomType}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {checkIn}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {checkOut}
                </Text>
                <Text fontSize="3xl" fontWeight="medium">
                  {pricePaid}
                </Text>
              </Box>
            </Center>
          </Box>
        </Center>
      </Box>

      {/* go to home buttom outside of the detailed receipt box  */}
      <Flex justifyContent="center" padding={100}>
        <Button
          diaplay="flex"
          top={50}
          size="lg"
          backgroundColor="#c6c1dc"
          textColor="white"
          onClick={() => {
            goHome(navigate);
          }}
        >
          Go to Home
        </Button>
      </Flex>
    </Box>

    // <Box>
    //   <Flex backgroundColor="white" border={"5px solid #C1DCC6"} gap={5}>
    //     <VStack gap={4}>
    //       <Box fontWeight="bold" fontSize="4xl" textColor="#33333">
    //         Your Room is Booked!
    //       </Box>

    //       <Box fontWeight="semibold" fontSize="3xl" textColor="#33333">
    //         ORDER CONFIRMATION
    //       </Box>
    //       <Box fontWeight="semibold" fontSize="3xl" textColor="#33333">
    //         Thank you for booking with Snooze. An email with your full
    //         confimation order is on its way!
    //       </Box>
    //     </VStack>
    //   </Flex>

    //   <Center>
    //     <Text fontSize="3xl" fontWeight="semibold">
    //       ORDER SUMMARY
    //     </Text>
    //   </Center>

    //   <Center>
    //     <Box backgroundColor="#C1DCC6">
    //       <Center height={500}>
    //         <Divider orientation="vertical" />
    //       </Center>
    //     </Box>
    //   </Center>

    //   <Text>{checkIn}</Text>
    //   <Text>{checkOut}</Text>
    //   <Text>{pricePaid}</Text>
    //   <Text>{hotel}</Text>
    //   <Text>{roomType}</Text>
    //   <Text>{firstName}</Text>
    //   <Text>{lastName}</Text>
    //   <Text>{address1}</Text>
    //   <Text>{address2}</Text>
    //   <Text>{city}</Text>
    //   <Text>{state}</Text>
    //   <Text>{zipCode}</Text>
    //   <Text>{country}</Text>
    //   <Button
    //     diaplay="flex"
    //     top={80}
    //     size="lg"
    //     backgroundColor="#c6c1dc"
    //     textColor="white"
    //     onClick={() => {
    //       goHome(navigate);
    //     }}
    //   >
    //     Go to Home
    //   </Button>
    // </Box>
  );
}

export default Receipt;
