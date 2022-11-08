import { Box, Container } from "@chakra-ui/react";
import BaseLayout from "./BaseLayout";

const BasicLayout = (props) => {
  return (
    <BaseLayout>
      <Container pt="100">
        <Box p="8" bg="#ffffff" rounded="lg" boxShadow="lg">
          {props.children}
        </Box>
      </Container>
    </BaseLayout>
  );
};

export default BasicLayout;
