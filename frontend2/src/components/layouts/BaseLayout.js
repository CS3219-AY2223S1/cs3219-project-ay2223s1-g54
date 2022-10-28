import { Box } from "@chakra-ui/react";

export const BaseLayout = (props) => {
  return (
    <Box minH="100vh" maxH="100vh" align="center" justify="center" bg="#39424e">
      {props.children}
    </Box>
  );
};

export default BaseLayout;
