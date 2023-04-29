import React, { useRef, useEffect } from "react";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
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
import SnoozeHeader from "../general/SnoozeHeader";
import { intervalLength } from "../intervals";
import Receipt from "./Receipt";

export default function Payment({ hotelID, roomID, checkIn, checkOut, hotel, price, roomType, setChosenRoom}) {
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
  const daysSpent = intervalLength(checkIn, checkOut)
  const [isReady, setIsReady] = useState(false)
  const [hasConfirmed, setHasConfirmed] = useState(false) //sets confirm booking to pending...
  const [hasPaid, setHasPaid] = useState(false) //prints receipt
  const [error, setError] = useState(false)
  let apiUrl = import.meta.env.VITE_API_URL;
  const userContext = useContext(UserContext);
  const pricePaid = (price * daysSpent * 1.15).toFixed(2)
  const reqRewardsPoints = pricePaid * 1000
  const rewardsPointsEarned = pricePaid * 100

  const handleSubmit = async (paidWithRewards) => {
      //Post booking to userData and roomData
      if (!paidWithRewards)
        await updateRewardsPoints(userContext.rewardPoints + rewardsPointsEarned)
      await bookHotelRoom(hotelID, roomID, checkIn, checkOut)
      
    setHasConfirmed(true)
    setTimeout(() => {
      if (!error)
        setHasPaid(true)
      else {
        console.log("uh oh!")
      }
    }, 1200)
    
  };

  const bookHotelRoom = async (hotelID, roomID, firstDate, lastDate) => {
    
    const bearerToken = "Bearer " + userContext.token;
    const response = await fetch("http://localhost:4000" + "/api/hotel/booking", {
      method: "PATCH",
      headers: { "Content-Type": "application/json",
      "Authorization": bearerToken
     },
      body: JSON.stringify({
        hotelID: hotelID,
        roomID: roomID,
        firstDate: firstDate,
        lastDate: lastDate
      }),
    });
    const json = await response.json();

    if (response.ok) {
      console.log("hotel booked!")
    }
    if (!response.ok) {
      console.log("error")
      setError(true)
    }
  };

  const updateRewardsPoints = async (newPoints) => {
    const bearerToken = "Bearer " + userContext.token;
    const response = await fetch("http://localhost:4000" + "/api/user/updatepoints", {
      method: "PUT",
      headers: { "Content-Type": "application/json",
      "Authorization": bearerToken
     },
      body: JSON.stringify({
        rewardPoints: newPoints
      }),
    });
    const json = await response.json();

    if (response.ok) {
      console.log("points updated")
      userContext.rewardPoints = newPoints
    }
    if (!response.ok) {
      console.log("error")
      setError(true)
    }
  }

  
  function checkIfReady() {
    if (firstNameRef.current &&
      lastNameRef.current &&
      cardNumberRef.current &&
      expDateRef.current &&
      secCodeRef.current &&
      addressOneRef.current &&
      cityRef.current &&
      stateRef.current &&
      zipCodeRef.current &&
      countryRef.current)
    setIsReady(Boolean(firstNameRef.current.value &&
    lastNameRef.current.value &&
    cardNumberRef.current.value &&
    expDateRef.current.value &&
    secCodeRef.current.value &&
    addressOneRef.current.value &&
    cityRef.current.value &&
    stateRef.current.value &&
    zipCodeRef.current.value &&
    countryRef.current.value));
    console.log(isReady)

  }


  function ConfirmButton() {
    let confirmText = "Confirm Booking"
    if (hasConfirmed)
      confirmText = "Processing..."
    if (isReady) {
      return <Button backgroundColor="#c6c1dc" textColor="white" size="lg" onClick={() => {handleSubmit(false)}}>
      {confirmText}
    </Button>
    }
    return <Button backgroundColor="#aaaaaa" size="lg" cursor="not-allowed">
      Confirm Booking
    </Button>
  }

  function RewardsButton() {
    let points = userContext.rewardPoints
    if (points < reqRewardsPoints)
      return (<></>)
    if (isReady) {
      return <Button backgroundColor="#c6c1dc" textColor="white" size="lg" onClick={() => {
        updateRewardsPoints(points - reqRewardsPoints)
        handleSubmit(true)
        }}>
      Pay with {reqRewardsPoints} Reward Points
    </Button>
    }
    return <Button backgroundColor="#aaaaaa" size="lg" cursor="not-allowed">
      Pay with {reqRewardsPoints} Reward Points
    </Button>
  }


  if (hasPaid &&
    firstNameRef.current &&
      lastNameRef.current &&
      cardNumberRef.current &&
      expDateRef.current &&
      secCodeRef.current &&
      addressOneRef.current &&
      cityRef.current &&
      stateRef.current &&
      zipCodeRef.current &&
      countryRef.current)
    return (
      <Receipt 
          checkIn={checkIn}
          checkOut={checkOut}
          hotel={hotel}
          roomType={roomType}
          pricePaid={pricePaid}
          firstName={firstNameRef.current.value}
          lastName={lastNameRef.current.value}
          address1={addressOneRef.current.value}
          address2={addressTwoRef.current.value}
          city={cityRef.current.value}
          state={stateRef.current.value}
          zipCode={zipCodeRef.current.value}
          country={countryRef.current.value}
      />
    )
  return (
    <Box>
      <Center mt="10">
      <VStack
          w={"60%"}
          p={5}
          justifyContent={"center"}
          alignItems={"center"}
          gap={0.5}
          border={"5px solid #9A9A9A"}
          borderRadius={30}
        >
            <Heading textColor="#33333">Booking Details</Heading>
            <Text>Hotel: {hotel}</Text>
            <Text>Room: {roomType}</Text>
            <Text>Dates Booked: {checkIn} to {checkOut}</Text>
            <Text>${price}/day x {daysSpent} days + fees =</Text>
            <Text fontWeight="bold" fontSize="20">${pricePaid}</Text>
            <Text>And Earn {rewardsPointsEarned} Reward Points!</Text>

        </VStack>
      </Center>
      <Flex
        my={10}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
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
            <Input ref={firstNameRef} type="text" onChange={() => {checkIfReady()}} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Last Name</FormLabel>
            <Input ref={lastNameRef} type="text" onChange={() => {checkIfReady()}}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Card Number</FormLabel>
            <Input ref={cardNumberRef} type="number" onChange={() => {checkIfReady()}}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Expiration Date</FormLabel>
            <Input ref={expDateRef} w={"50%"} placeholder="MM" type="month" onChange={() => {checkIfReady()}}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Security Code</FormLabel>
            <Input ref={secCodeRef} w={"35%"} placeholder="123" type="password" onChange={() => {checkIfReady()}}/>
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
            <Input ref={addressOneRef} placeholder="Address Line 1" onChange={() => {checkIfReady()}}/>
            <Input ref={addressTwoRef} top={2} placeholder="Address Line 2" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>City</FormLabel>
            <Input ref={cityRef} placeholder="City" onChange={() => {checkIfReady()}}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>State</FormLabel>
            <Input ref={stateRef} placeholder="State" onChange={() => {checkIfReady()}}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Zip Code</FormLabel>
            <Input ref={zipCodeRef} placeholder="Zip Code" onChange={() => {checkIfReady()}}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel m={0}>Country</FormLabel>
            <Input ref={countryRef} placeholder="Country" onChange={() => {checkIfReady()}}/>
          </FormControl>
        </VStack>
      </Flex>
      
      <Center mb="10">
        <HStack gap={4}>
        <Button size="lg" backgroundColor="gr" onClick={() => {setChosenRoom(null)}}>
          Back
        </Button>
        <ConfirmButton />
        <RewardsButton />
      </HStack>
      </Center>
    </Box>
  );
}
