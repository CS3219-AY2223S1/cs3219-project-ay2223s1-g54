import { Box, Text } from "@chakra-ui/react";

function MessageComponent({ data }) {
  const name = data.name;
  const time = data.time;
  const message = data.message;

  return (
    <Box
      p="2"
      mb="1"
      backgroundColor="gray.300"
      border="1px solid"
      borderColor="gray.500"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text>
          <strong>{name}</strong>
        </Text>
        <Text>{time}</Text>
      </Box>
      <Box>
        <Text>{message}</Text>
      </Box>
    </Box>
  );
}

export default MessageComponent;
