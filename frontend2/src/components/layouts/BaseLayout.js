import { Box } from "@chakra-ui/react";

export const BaseLayout = (props) => {
  return (
    <Box
      minW="100vw"
      maxW="100vw"
      minH="100vh"
      maxH="100vh"
      overflow="hidden"
      bg="#39424e"
    >
      {props.children}
    </Box>
  );
};

export default BaseLayout;
