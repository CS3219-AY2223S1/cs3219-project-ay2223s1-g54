import { Box, Flex, Select } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <Box w="full" minH="full" maxH="full" h="full">
      <Flex direction="column" minH="full" maxH="full" h="full">
        <Flex pb="3">
          <Select variant="filled" mr="2">
            <option value="testTheme1">Theme 1</option>
            <option value="testTheme2">Theme 2</option>
            <option value="testTheme3">Theme 3</option>
          </Select>
          <Select variant="filled" ml="2">
            <option value="testLanguage1">Language 1</option>
            <option value="testLanguage2">Language 2</option>
            <option value="testLanguage3">Language 3</option>
          </Select>
        </Flex>
        <Box h="full" minH="full" maxH="full" overflow="hidden">
          <Editor theme="vs-dark" />
        </Box>
      </Flex>
    </Box>
  );
};

export default CodeEditor;
