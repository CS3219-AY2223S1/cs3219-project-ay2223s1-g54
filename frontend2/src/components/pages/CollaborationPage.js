import { useLocation } from "react-router-dom";
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
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import DevEnvironment from "../DevEnvironment";
import QuestionPane from "../QuestionPane";
import BaseLayout from "../layouts/BaseLayout";
import "react-reflex/styles.css";

const CollaborationPage = () => {
  const location = useLocation();
  const collabData = location.state.collabData;
  const questionData = collabData.questionSet[0];

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
          <ReflexContainer orientation="vertical">
            <ReflexElement style={{ overflow: "hidden" }}>
              <Box w="100%" h="full" minH="full" maxH="full">
                <QuestionPane questionData={questionData} />
              </Box>
            </ReflexElement>
            <ReflexSplitter
              style={{ width: "5px", backgroundColor: "#39424e" }}
            />
            <ReflexElement style={{ overflow: "hidden" }}>
              <Tabs
                w="100%"
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
            </ReflexElement>
          </ReflexContainer>
        </Flex>
      </Stack>
    </BaseLayout>
  );
};

export default CollaborationPage;
