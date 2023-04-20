import { Box, Button, Text } from "@chakra-ui/react";

function Hotel({ name, address, imageSrc, price, city }) {
  return (
    <Box
      w={["90vw", "80vw", "400px"]}
      h={["90vw", "80vw", "400px"]}
      bg="gray.200"
      m="3"
      borderRadius="md"
      p={4}
      textAlign="center"
      maxW="100%"
    >
      <Text fontWeight="bold">{name}</Text>
      <Text>{"Address: " + address}</Text>
      <Text>{"City: " + city}</Text>
      <Text>{"$" + price}</Text>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Hotel"
          width="200%"
          margin="0"
          my={4}
          style={{ display: "block", margin: "auto" }}
        />
      )}
      <Button colorScheme="green" mt={4}>
        Book
      </Button>
    </Box>
  );
}

export default Hotel;
