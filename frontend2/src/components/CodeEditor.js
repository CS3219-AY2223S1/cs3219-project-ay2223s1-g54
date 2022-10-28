import { Box, Flex, Select } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <Box w="100%" minW="25%">
      <Flex p="3" pr="5" justify="flex-end">
        <Select variant="filled" w="150px" value="testLanguage1">
          <option value="testLanguage1">Language 1</option>
          <option value="testLanguage2">Language 2</option>
          <option value="testLanguage3">Language 3</option>
        </Select>
      </Flex>
      <Editor height="100%" theme="vs-dark" />
    </Box>
  );
};

export default CodeEditor;
