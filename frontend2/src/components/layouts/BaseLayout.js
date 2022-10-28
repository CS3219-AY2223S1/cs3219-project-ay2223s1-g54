import { Box, Container } from "@chakra-ui/react";

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
      <Container>{props.children}</Container>
    </Box>
  );
};

export default BaseLayout;
