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
  return (
    <Box w="full" minH="full" maxH="full" h="full">
      <Flex direction="column" minH="full" maxH="full" h="full">
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                IDE Options
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Flex>
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
        <CodeEditor />
      </Flex>
    </Box>
  );
};

export default DevEnvironment;
