import { useLocation, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Link,
  Stack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import CodeEditor from "../CodeEditor";
import QuestionPane from "../QuestionPane";
import Navbar from "../Navbar";
import BaseLayout from "../layouts/BaseLayout";

const SubmissionViewerPage = () => {
  const location = useLocation();
  const { question, code } = location.state;

  return (
    <BaseLayout>
      <Navbar>
        <Link color="blue.400" as={RouterLink} to="/home">
          Back to Home
        </Link>
      </Navbar>
      <Stack w="full" h="full" minH="full" maxH="full">
        <Flex w="full" h="full" minH="full" maxH="full">
          <ReflexContainer orientation="vertical">
            <ReflexElement style={{ overflow: "hidden" }}>
              <Box w="100%" h="full" minH="full" maxH="full">
                <QuestionPane questionData={question} />
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
                </TabList>
                <TabPanels h="full" minH="full" maxH="full">
                  <TabPanel h="full" minH="full" maxH="full">
                    <CodeEditor value={code} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ReflexElement>
          </ReflexContainer>
        </Flex>
      </Stack>
    </BaseLayout>
  );
};

export default SubmissionViewerPage;
