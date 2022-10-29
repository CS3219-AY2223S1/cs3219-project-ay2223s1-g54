import { Box } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <Box h="full" minH="full" maxH="full" pb="175">
      <Editor theme="vs-dark" />
    </Box>
  );
};

export default CodeEditor;
