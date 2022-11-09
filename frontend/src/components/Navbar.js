import { Box, Flex } from "@chakra-ui/react";

const Navbar = (props) => {
  return (
    <Box px="4" bg="gray.800">
      <Flex
        h="16"
        alignItems="center"
        justifyContent="space-between"
        color="gray.100"
      >
        <Box>𝒫𝑒𝑒𝓇𝒫𝓇𝑒𝓅</Box>
        <Flex direction="row" alignItems="flex-end" justifyContent="center">
          {props.children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
