import { useEffect, useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import moment from "moment";
import { useAuth } from "../hooks/useAuth";
import MessageComponent from "./MessageComponent.js";

function ChatComponent(props) {
  const { auth } = useAuth();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const chatboxRef = useRef();
  const usernameRef = useRef();
  const { userId, socket } = auth;
  const collabData = props.collabData;
  const { roomId, userId1, username1, username2 } = collabData;

  useEffect(() => {
    // Get current username
    if (userId === userId1) usernameRef.current = username1;
    else usernameRef.current = username2;

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
    <Box
      height={props.hidden === true ? "100%" : "0"}
      visibility={props.hidden === true ? "none" : "hidden"}
      display="flex"
      flexDirection="column"
      maxHeight="100%"
      border="1px solid"
      borderColor="grey.300"
      borderRadius="3"
      justifyContent="center"
      overflow="scroll"
    >
      <Box
        ref={chatboxRef}
        display="flex"
        flexDirection="column"
        flex="1"
        overflow="scroll"
      >
        {messageList.map((messageData) => {
          return (
            <MessageComponent key={messageData.messageId} data={messageData} />
          );
        })}
      </Box>
      <Box>
        <Box sx={{ padding: "10px" }}>
          <TextField
            label="Type Message"
            variant="standard"
            value={message}
            onChange={handleMessageChange}
            fullWidth
          />
          <br />
          <br />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={message === "" ? true : false}
            fullWidth
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export { ChatComponent };
