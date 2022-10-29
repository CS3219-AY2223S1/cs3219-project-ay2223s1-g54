import { Box } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";

const CodeEditor = (props) => {
  return (
    <Box h="full" minH="full" maxH="full" pb="180">
      <Editor theme={props.theme || "light"} />
    </Box>
  );
};

export default CodeEditor;
