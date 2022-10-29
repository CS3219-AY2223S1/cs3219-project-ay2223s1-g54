import {
  Box,
  Button,
  Flex,
  Stack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import CodeEditor from "../components/CodeEditor";
import QuestionPane from "../components/QuestionPane";
import BaseLayout from "../components/layouts/BaseLayout";

const CollaborationPage = () => {
  return (
    <BaseLayout>
      <Stack w="full" h="full" minH="full" maxH="full">
        <Flex pt="2" pr="2" justify="flex-end">
          <Button mr="2" colorScheme="blue">
            Submit
          </Button>
          <Button mr="2" colorScheme="red">
            Leave Room
          </Button>
        </Flex>
        <Flex w="full" h="full" minH="full" maxH="full">
          <Box w="50%" h="full" minH="full" maxH="full">
            <QuestionPane />
          </Box>
          <Tabs
            w="50%"
            h="full"
            minH="full"
            maxH="full"
            bg="#ffffff"
            isFitted
            variant="enclosed"
            colorScheme="green"
          >
            <TabList>
              <Tab>Code Editor</Tab>
              <Tab>White Board</Tab>
              <Tab>Judge</Tab>
            </TabList>
            <TabPanels h="full" minH="full" maxH="full">
              <TabPanel h="full" minH="full" maxH="full">
                <CodeEditor />
              </TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Stack>
    </BaseLayout>
  );
};

export default CollaborationPage;
