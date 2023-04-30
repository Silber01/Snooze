import React, { useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SnoozeHeader from "../general/SnoozeHeader";
import image from "../../assets/sampleprofile.png";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Image,
  FormControl,
  Tag,
  FormLabel,
} from "@chakra-ui/react";

const EditProfile = ({ user }) => {
  const userData = useContext(UserContext);
  console.log(userData);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
  };

  function handleClick() {
    navigate("/profilepage");
  }

  useEffect(() => {
    if (userData.firstName) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
    }
  }, [userData]);
  return (
    <>
      <SnoozeHeader />
      {/* <Heading align="center" fontSize={25} mt={7}>
        Edit Profile
      </Heading> */}
      {/* <Box align="center">
        <Image mt={4} borderRadius="full" boxSize="130px" src={image} alt="" />
      </Box> */}

      <FormControl onSubmit={handleSave}>
        <Stack spacing={8} align="center" mt={20}>
          <div>
            <FormLabel>First Name</FormLabel>
            <Input
              size="lg"
              w={500}
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <FormLabel>Last Name</FormLabel>
            <Input
              size="lg"
              w={500}
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <Button onClick={handleClick} mt={7} colorScheme="green">
            Save
          </Button>
        </Stack>
      </FormControl>
    </>
  );
};

export default EditProfile;
