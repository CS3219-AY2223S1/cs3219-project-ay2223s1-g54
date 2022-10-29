import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Select,
  Stack,
} from "@chakra-ui/react";
import CodeEditor from "../components/CodeEditor";

const DevEnvironment = () => {
  const [codeEditorTheme, setCodeEditorTheme] = useState("light");

  const updateCodeEditorTheme = (event) => {
    const theme = event.target.value;
    setCodeEditorTheme(theme);
  };

  return (
    <Box w="full" minH="full" maxH="full" h="full">
      <Flex direction="column" minH="full" maxH="full" h="full">
        <Accordion allowToggle mb="2">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                IDE Options
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Flex>
                <Select
                  variant="filled"
                  mr="2"
                  onChange={updateCodeEditorTheme}
                >
                  <option value="light">Light</option>
                  <option value="vs-dark">Dark</option>
                </Select>
                <Select variant="filled" ml="2">
                  <option value="testLanguage1">Language 1</option>
                  <option value="testLanguage2">Language 2</option>
                  <option value="testLanguage3">Language 3</option>
                </Select>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Input / Output
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Stack>
                <Box w="100%" h="100px" bg="green"></Box>
                <Box w="100%" h="400px" bg="red"></Box>
                <Button colorScheme="green">Compile Code</Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <CodeEditor theme={codeEditorTheme} />
      </Flex>
    </Box>
  );
};

export default DevEnvironment;
