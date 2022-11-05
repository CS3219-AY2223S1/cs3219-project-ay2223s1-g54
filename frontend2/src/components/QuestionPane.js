import { Box, Flex, Heading, Stack, Tag } from "@chakra-ui/react";

const QuestionPane = ({ questionData }) => {
  const difficultyTagColorScheme = {
    colorScheme: "white",
  };

  if (questionData.difficulty == "Easy") {
    difficultyTagColorScheme.colorScheme = "green";
  } else if (questionData.difficulty == "Medium") {
    difficultyTagColorScheme.colorScheme = "yellow";
  } else if (questionData.difficulty == "Hard") {
    difficultyTagColorScheme.colorScheme = "red";
  }

  return (
    <Box w="full" h="full" minH="full" maxH="full" bg="#ffffff">
      <Stack w="full" h="full" minH="full" maxH="full" p="5">
        <Heading size="lg">{questionData.title}</Heading>
        <Flex>
          <Tag size="sm" key="sm" variant="solid" {...difficultyTagColorScheme}>
            {questionData.difficulty}
          </Tag>
        </Flex>
        <Flex>
          {questionData.topicTags.map(({ name }) => {
            return (
              <Tag size="sm" key="sm" variant="solid" colorScheme="teal" mr="2">
                {name}
              </Tag>
            );
          })}
        </Flex>
        <Flex w="full" h="full" minH="full" maxH="full" pb="144">
          <Box
            w="full"
            h="full"
            minH="full"
            maxH="full"
            p="2"
            border="1px solid black"
            overflow="scroll"
            dangerouslySetInnerHTML={{ __html: questionData.content }}
          ></Box>
        </Flex>
      </Stack>
    </Box>
  );
};

export default QuestionPane;
