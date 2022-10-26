import { Flex } from "@chakra-ui/react";

export const BaseLayout = (props) => {
  return (
    <Flex
      minH="100vh"
      maxH="100vh"
      align="center"
      justify="center"
      bg="#39424e"
    >
      {props.children}
    </Flex>
  );
};

export default BaseLayout;
