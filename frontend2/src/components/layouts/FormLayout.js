import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import BaseLayout from "./BaseLayout";

const FormLayout = (props) => {
  return (
    <BaseLayout>
      <Flex align="center" justify="center">
        <Stack mt="150">
          <Heading textAlign="center" color="#ffffff">
            {props.title}
          </Heading>
          <Box p="8" bg="white" rounded="lg" boxShadow="lg">
            {props.form}
          </Box>
        </Stack>
      </Flex>
    </BaseLayout>
  );
};

export default FormLayout;
