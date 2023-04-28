import React, { useRef } from "react";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Input,
  VStack,
  Heading,
  Button,
  Divider,
  HStack,
} from "@chakra-ui/react";
import SnoozeHeader from "../general/SnoozeHeader";

export default function Payment(props) {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const cardNumberRef = useRef();
  const expDateRef = useRef();
  const secCodeRef = useRef();

  const addressOneRef = useRef();
  const addressTwoRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipCodeRef = useRef();
  const countryRef = useRef();

  const handleSubmit = async () => {
    console.log(
      "paying",
      firstNameRef.current.value,
      lastNameRef.current.value,
      cardNumberRef.current.value,
      expDateRef.current.value,
      secCodeRef.current.value,

      addressOneRef.current.value,
      addressTwoRef.current.value,
      cityRef.current.value,
      stateRef.current.value,
      zipCodeRef.current.value,
      countryRef.current.value
    );
  };

  return (
    <>
      <SnoozeHeader />

      <Flex
        my={20}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={8}
      >
        <VStack
          w={"25%"}
          p={10}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          border={"5px solid #9A9A9A"}
          borderRadius={30}
        >
          <Heading textColor="#33333">Payment Details</Heading>
          <FormControl isRequired>
            <FormLabel m={0}>First Name</FormLabel>
            <Input ref={firstNameRef} type="text" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Last Name</FormLabel>
            <Input ref={lastNameRef} type="text" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Card Number</FormLabel>
            <Input ref={cardNumberRef} type="number" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Expiration Date</FormLabel>
            <Input ref={expDateRef} w={"50%"} placeholder="MM" type="month" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Security Code</FormLabel>
            <Input ref={secCodeRef} w={"35%"} placeholder="123" type="number" />
          </FormControl>
        </VStack>
        <Divider orientation="horizontal" w={3} />
        <VStack
          w={"25%"}
          p={10}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          border={"5px solid #9A9A9A"}
          borderRadius={30}
        >
          <Heading textColor="#33333">Billing Address</Heading>
          <FormControl isRequired>
            <FormLabel m={0}>Address</FormLabel>
            <Input ref={addressOneRef} placeholder="Address Line 1" />
            <Input ref={addressTwoRef} top={2} placeholder="Address Line 2" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>City</FormLabel>
            <Input ref={cityRef} placeholder="City" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>State</FormLabel>
            <Input ref={stateRef} placeholder="State" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Zip Code</FormLabel>
            <Input ref={zipCodeRef} placeholder="Zip Code" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Country</FormLabel>
            <Input ref={countryRef} placeholder="Country" />
          </FormControl>
        </VStack>

        <HStack gap={4}>
          <Button size="lg" backgroundColor="gr" top={10}>
            Back
          </Button>

          <Button
            onClick={handleSubmit}
            backgroundColor="#c6c1dc"
            textColor="white"
            top={10}
            size="lg"
          >
            Confirm Booking
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
