import React, {useState} from "react";
// import "./EditProfile.css";
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
  FormControl
} from "@chakra-ui/react";

const EditProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
  };

  function handleClick() {
    navigate('/profilepage');
  }
  
  return (
    <>
    <SnoozeHeader />
    <Heading align='center' fontSize={25} mt={5}>
      Edit Profile
    </Heading>
    <Box align='center'>
      <Image
      borderRadius='full'
      boxSize='150px'
      src={image}
      alt=''
      />
      <Button colorScheme='messenger' variant='link'>
        Edit picture or avatar
      </Button>
    </Box>

    <FormControl onSubmit={handleSave}>
    <Stack spacing={8}  align='center' mt={10} >
      {/* need to figure out how to change name */}
      <Input size='lg' w={500}
      type='text' 
      value={name} 
      onChange={(event) => setName(event.target.value)}
      />
      {/* need to figure out how to update in profile page after change */}
      <Input size='lg'  w={500}
      type='email'
      value={email} 
      onChange={(event) => setEmail(event.target.value)}
      />
      <Button onClick={handleClick} mt={7} colorScheme='green'>
            Save
      </Button>
    </Stack>
    </FormControl>
   
    </>
  );
};

export default EditProfile;
