import { Flex, Button, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex align="center" justify="space-between" bg="gray.200" p="3">
      <Text fontSize="2xl" fontWeight="bold" w="100%">
        Snooze
      </Text>
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
