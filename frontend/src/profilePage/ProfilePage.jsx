import React, { useContext } from "react";
// import './ProfilePage.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import image from "../../assets/sampleprofile.png";
import Rewardpoints from "./Rewardpoints";
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
} from "@chakra-ui/react";

function ProfilePage(props) {
  const userContext = useContext(UserContext);
  const name = `${props.user.firstName} ${props.user.lastName}`;
  const { email } = props;

  console.log(userContext);
    const navigate = useNavigate();

    function handleClick() {
        navigate('/editprofile');
    }

    return (
    <>
    <img src='../../assets/SnoozeLogo.svg'></img>

    <Box bg='mintgreen' p={4} align='center'>
        <Image
        borderRadius='full'
        boxSize='150px'
        src={image}
        alt=''
        />
        {/* have to make onclick route to editprofile */}
        <Button mt={4} colorScheme='gray'>
            Edit Profile 
        </Button>
    </Box>
      
    <Heading ml={20} mt={10} size="lg">Personal Info</Heading>
        <Box p={4} ml={40} mt={4} fontSize="2xl" fontWeight={500}>
            <Text>Name: {name}</Text>
            <Text mt={5}>Email: {props.user.email}</Text>
        </Box>

    <Heading ml={20} mt={12} size="lg">Current Bookings</Heading>
    <Box bg='indiepink' mt={5} ml={40} w='55em' h='20em'>
        {/* have to input bookings data */}
    </Box>

    <Heading ml={20} mt={12} size="lg">Past Bookings</Heading>
    <Box bg='indiepink' mt={5} ml={40} w='55em' h='20em'>
        {/* have to input bookings data */}
    </Box>

    <Heading ml={20} mt={12} size="lg">Rewards</Heading>
    <Box bg='gray.200' mt={5} ml={40} w='35em' h='40em'>
        {/* have to figure out how to get reward points */}
        <Flex justifyContent='center' alignItems='center'>
        <Circle mt={10} size='20em' borderColor='pink' borderWidth='12px' color='black'>
            <Text textAlign='center' fontWeight='bold' fontSize={22}>100000<br/>Rewards points</Text>
        </Circle>
        </Flex>

        
        
    </Box>

        
        
      
    </>
    );
  }
  
  export default ProfilePage;