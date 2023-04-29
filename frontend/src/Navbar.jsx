import { Flex, Button, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "./profilePage/ProfilePage";

function Navbar() {
  let navigate = useNavigate();
  function goHome() {
    navigate("/home")
  }
  function handleClick() {
    navigate("/profilepage");
  }

  return (
    //c1dcc6
    <Flex align="center" justify="space-between" bg="#c1dcc6" p="3">
      <Image onClick={() => {goHome()}} src="../assets/SnoozeLogo.svg"></Image>
      <Flex align="center" justify="center">
        
        <Button onClick={handleClick} bg="white" mr={4} variant="ghost">
          Profile
        </Button>
        
      </Flex>
    </Flex>
  );
}

export default Navbar;
