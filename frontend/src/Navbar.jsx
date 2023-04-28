import { Flex, Button, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  function goHome() {
    navigate("/home")
  }
  return (
    //c1dcc6
    <Flex align="center" justify="space-between" bg="#c1dcc6" p="3">
      <Image onClick={() => {goHome()}} src="../assets/SnoozeLogo.svg"></Image>
      <Flex align="center" justify="center">
        <Button colorScheme="gray" variant="ghost">
          Home
        </Button>
        <Button colorScheme="gray" variant="ghost">
          Profile
        </Button>
        <Button colorScheme="gray" variant="ghost">
          Payment
        </Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
