import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useToast,
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
import useAuth from "../../hooks/useAuth";
import "react-reflex/styles.css";

const CollaborationPage = () => {
  const [languageId, setLanguageId] = useState(null);
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { auth } = useAuth();
  const { socket } = auth;
  const collabData = location.state.collabData;
  const { roomId, questionSet } = collabData;
  const questionData = questionSet[0];

  useEffect(() => {
    socket.on("receiveLeaveRoom", () => {
      const toastData = {
        title: "Collaborative Session",
        description: "The session will now end",
        status: "info",
        duration: 3000,
        isClosable: true,
      };
      toast(toastData);
      navigate("/home");
    });

    return () => {
      socket.off("receiveLeaveRoom");
    };
  }, []);

  const handleLeaveRoom = () => {
    socket.emit("sendLeaveRoom", { roomId });
  };

  return (
    <BaseLayout>
      <Stack w="full" h="full" minH="full" maxH="full">
        <Flex pt="2" pr="2" justify="flex-end">
          <Button mr="2" colorScheme="blue">
            Submit
          </Button>
          <Button mr="2" colorScheme="red" onClick={handleLeaveRoom}>
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
                    <DevEnvironment
                      socket={socket}
                      roomId={roomId}
                      codeSnippets={questionData.codeSnippets}
                      onSetLanguageId={setLanguageId}
                      onSetCode={setCode}
                    />
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
