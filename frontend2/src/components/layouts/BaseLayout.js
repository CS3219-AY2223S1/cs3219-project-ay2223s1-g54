import { Box, Flex } from "@chakra-ui/react";

export const BaseLayout = (props) => {
  return (
    <Box as={Flex} minH="100vh" maxH="100vh" justify="center" bg="#39424e">
      {props.children}
    </Box>
  );
};

export default BaseLayout;
