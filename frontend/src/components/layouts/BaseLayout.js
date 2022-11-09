import { Box } from "@chakra-ui/react";

export const BaseLayout = (props) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      minW="100vw"
      minH="100vh"
      maxW="100vw"
      maxH="100vh"
      overflow="hidden"
      bg="#39424e"
    >
      {props.children}
    </Box>
  );
};

export default BaseLayout;
