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
import VideoAudioChat from "../VideoAudioChat";
import WhiteBoard from "../WhiteBoard";
import BaseLayout from "../layouts/BaseLayout";
import { URL_HISTORY_SVC_USER_SUBMISSIONS } from "../../configs";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "react-reflex/styles.css";

const CollaborationPage = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { userId, socket } = auth;
  const collabData = location.state.collabData;
  const { roomId, questionSet, userId1, userId2, username1, username2 } =
    collabData;

  const [questionObject, setQuestionObject] = useState(
    questionSet[questionIndex]
  );

  useEffect(() => {
    socket.on("receiveSubmitCode", () => {
      if (questionIndex == 1) {
        const toastData = {
          title: "Collaborative Session",
          description: "The interview session is now completed",
          status: "success",
          duration: 3000,
          isClosable: true,
        };
        toast(toastData);
        navigate("/home");
        return;
      }
      setQuestionIndex(questionIndex + 1);
    });

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

    setQuestionObject(questionSet[questionIndex]);

    const toastData = {
      title: "Collaborative Session",
      status: "info",
      duration: 3000,
      isClosable: true,
    };

    if (
      (userId === userId1 && questionIndex === 0) ||
      (userId === userId2 && questionIndex === 1)
    )
      toastData.description = "Your role is the interviewee";
    else if (
      (userId === userId1 && questionIndex === 1) ||
      (userId === userId2 && questionIndex === 0)
    )
      toastData.description = "Your role is the interviewer";
    toast(toastData);

    return () => {
      socket.off("receiveSubmitCode");
      socket.off("receiveLeaveRoom");
    };
  }, [questionIndex]);

  const handleSubmitCode = async () => {
    setIsSubmitting(true);

    const toastData = {
      title: "",
      description: "",
      status: "",
      duration: 3000,
      isClosable: true,
    };

    try {
      const codeSubmissionUrl = `${URL_HISTORY_SVC_USER_SUBMISSIONS}/${userId}/${questionObject.id}`;
      await axiosPrivate.post(codeSubmissionUrl, { code: code });
      toastData.status = "success";
      toastData.title = "Success";
      toastData.description = "Code successfully submitted";
    } catch (err) {
      toastData.status = "error";
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        toastData.title = name;
        toastData.description = message;
      } else {
        toastData.title = "Unknown Error";
        toastData.description = "Please try again later";
      }
    }

    toast(toastData);
    setIsSubmitting(false);
    socket.emit("sendSubmitCode", { roomId });
  };

  const handleLeaveRoom = () => {
    socket.emit("sendLeaveRoom", { roomId });
  };

  return (
    <BaseLayout>
      <Navbar>
        {((userId === userId1 && questionIndex === 0) ||
          (userId === userId2 && questionIndex === 1)) && (
          <Button
            mr="2"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Submitting"
            onClick={handleSubmitCode}
          >
            Submit
          </Button>
        )}
        <Button mr="2" colorScheme="red" onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </Navbar>
      <Stack w="full" h="full" minH="full" maxH="full">
        <Flex w="full" h="full" minH="full" maxH="full">
          <ReflexContainer orientation="vertical">
            <ReflexElement style={{ overflow: "hidden" }}>
              <Box w="100%" h="full" minH="full" maxH="full">
                <QuestionPane questionData={questionObject} />
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
                  <Tab>Chat Box</Tab>
                  <Tab>Video / Audio</Tab>
                </TabList>
                <TabPanels h="full" minH="full" maxH="full">
                  <TabPanel h="full" minH="full" maxH="full">
                    <DevEnvironment
                      roomId={roomId}
                      codeSnippets={questionObject.codeSnippets}
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
                  <TabPanel h="full" minH="full" maxH="full">
                    <VideoAudioChat
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
