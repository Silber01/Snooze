import { Box, Flex } from "@chakra-ui/react";
import "./HomeBanner.css";

function HomeBanner() {
  return (
    <div className="banner">
      <Flex minH="320px" minW="400px" padding={10} justifyContent="center">
        <Box backgroundColor="#F5C2C2" fontSize="6xl" display="flex">
          <p> Wanna Earn Rewards? Sign Up Today and Begin Collecting Points!</p>
        </Box>
      </Flex>
    </div>
  );
}

export default HomeBanner;
