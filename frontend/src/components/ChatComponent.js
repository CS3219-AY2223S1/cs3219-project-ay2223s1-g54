import { useLocation } from "react-router-dom";
import { Box, Button, TextField, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import MessageComponent from "./MessageComponent.js";
import { useAuth } from "../hooks/useAuth";

function ChatComponent() {
  const location = useLocation();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const { auth } = useAuth();
  const { socket } = auth;
  const { roomId, difficulty, userId1, userId2, questionSet } =
    location.state.collabData;

  useEffect(() => {
    socket.on("receiveMessage", ({ message }) => {
      //update the event
      updateMessageList(message);
    });
  }, []);

  const updateMessageList = (message) => {
    setMessageList((list) => [...list, message]);
  };

  const sendMessage = () => {
    if (message !== "") {
      const current = new Date();
      const time = current.getHours() + ":" + current.getMinutes();
      const messageData = {
        roomId: roomId,
        messageId: messageList.length,
        name: "Jerome", //TODO
        message: message,
        time: time,
      };
      // TODO
      socket.emit("sendMessage", messageData);
      updateMessageList(messageData);
      setMessage("");
    }
  };

  return (
    <Box
      className="chat-box"
      sx={{
        height: "50%",
        width: "30%",
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 3,
        maxHeight: 400,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        className="message-box"
        sx={{
          justifyContent: "center",
          height: 300,
          maxHeight: "75%",
          overflow: "auto",
        }}
      >
        <Grid>
          <ul>
            {messageList.map((message) => {
              return (
                <MessageComponent key={message.messageId} data={message} />
              );
            })}
          </ul>
        </Grid>
      </Box>
      <Box
        className="message-input"
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          m: 0.5,
          p: 1,
        }}
      >
        <TextField
          label="Type Message"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ width: "80%" }}
          multiline
        />

        <Button
          variant={"outlined"}
          onClick={sendMessage}
          sx={{ width: "10%" }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ChatComponent;
