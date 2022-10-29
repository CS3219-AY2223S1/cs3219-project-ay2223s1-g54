import { Box, Flex, Heading, Stack, Tag } from "@chakra-ui/react";

const QuestionPane = () => {
  return (
    <Box
      w="full"
      h="full"
      minH="full"
      maxH="full"
      bg="#ffffff"
      borderRight="1px solid black"
    >
      <Stack w="full" h="full" minH="full" maxH="full" p="5">
        <Heading size="lg">Test Title</Heading>
        <Flex>
          <Tag size="sm" key="sm" variant="solid" colorScheme="green">
            Test Difficulty
          </Tag>
        </Flex>
        <Flex>
          <Tag size="sm" key="sm" variant="solid" colorScheme="teal">
            Test Category
          </Tag>
        </Flex>
        <Flex w="full" h="full" minH="full" maxH="full" pb="150">
          <Flex
            w="full"
            h="full"
            minH="full"
            maxH="full"
            p="2"
            border="1px solid black"
            overflow="scroll"
          >
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
            lorem ipsum <br />
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
};

export default QuestionPane;
