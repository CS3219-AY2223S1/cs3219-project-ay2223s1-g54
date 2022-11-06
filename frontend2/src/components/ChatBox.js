import { useEffect, useRef, useState } from "react";
import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import MessageComponent from "./MessageComponent.js";

const ChatBox = ({ roomId, userId1, userId2, username1, username2 }) => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const chatboxRef = useRef();
  const usernameRef = useRef();
  const { auth } = useAuth();
  const { userId, socket } = auth;

  useEffect(() => {
    // Get current username
    if (userId === userId1) usernameRef.current = username1;
    else if (userId === userId2) usernameRef.current = username2;

    socket.on("receiveMessage", (message) => {
      updateMessageList(message);
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const updateMessageList = (message) => {
    setMessageList((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (message === "") return;

    const messageData = {
      roomId: roomId,
      name: usernameRef.current,
      time: moment().format("LTS"),
      messageId: messageList.length,
      message: message,
    };
    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  const handleMessageChange = (event) => {
    const message = event.target.value;
    setMessage(message);
  };

  return (
    <Stack h="full" minH="full" maxH="full">
      <Flex h="full" direction="column" overflow="scroll" ref={chatboxRef}>
        {messageList.map((messageData) => {
          return (
            <MessageComponent key={messageData.messageId} data={messageData} />
          );
        })}
      </Flex>
      <Flex pb="90">
        <Input
          mr="2"
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={handleMessageChange}
        />
        <Button
          colorScheme="teal"
          isDisabled={message === "" ? true : false}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Flex>
    </Stack>
  );
};

export default ChatBox;
