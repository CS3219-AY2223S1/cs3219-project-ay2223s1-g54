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
import DevEnvironment from "../components/DevEnvironment";
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
          <Box w="40%" h="full" minH="full" maxH="full">
            <QuestionPane />
          </Box>
          <Tabs
            w="60%"
            h="full"
            minH="full"
            maxH="full"
            bg="#ffffff"
            isFitted
            variant="line"
            colorScheme="green"
          >
            <TabList>
              <Tab>Code Editor</Tab>
              <Tab>White Board</Tab>
              <Tab>Communication</Tab>
            </TabList>
            <TabPanels h="full" minH="full" maxH="full">
              <TabPanel h="full" minH="full" maxH="full">
                <DevEnvironment />
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
