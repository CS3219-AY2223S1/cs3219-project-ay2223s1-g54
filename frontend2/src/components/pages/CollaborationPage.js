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
import ChatBox from "../ChatBox";
import DevEnvironment from "../DevEnvironment";
import QuestionPane from "../QuestionPane";
import Navbar from "../Navbar";
import WhiteBoard from "../WhiteBoard";
import BaseLayout from "../layouts/BaseLayout";
import useAuth from "../../hooks/useAuth";
import "react-reflex/styles.css";

const CollaborationPage = () => {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { auth } = useAuth();
  const { socket } = auth;
  const collabData = location.state.collabData;
  const { roomId, questionSet, userId1, userId2, username1, username2 } =
    collabData;
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
      <Navbar>
        <Button mr="2" colorScheme="blue">
          Submit
        </Button>
        <Button mr="2" colorScheme="red" onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </Navbar>
      <Stack w="full" h="full" minH="full" maxH="full">
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
                      roomId={roomId}
                      codeSnippets={questionData.codeSnippets}
                      onSetCode={setCode}
                    />
                  </TabPanel>
                  <TabPanel h="full" minH="full" maxH="full">
                    <WhiteBoard roomId={roomId} />
                  </TabPanel>
                  <TabPanel h="full" minH="full" maxH="full">
                    <ChatBox
                      roomId={roomId}
                      userId1={userId1}
                      userId2={userId2}
                      username1={username1}
                      username2={username2}
                    />
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

export default CollaborationPage;
