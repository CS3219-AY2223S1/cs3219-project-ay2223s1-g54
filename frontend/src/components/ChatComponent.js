import { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Grid } from "@mui/material";
import moment from "moment";
import { useAuth } from "../hooks/useAuth";
import MessageComponent from "./MessageComponent.js";

function ChatComponent(props) {
  const { auth } = useAuth();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
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

  return (
    <Box
      className="chat-box"
      sx={{
        height: "80%",
        width: "80%",
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 3,
        // maxHeight: 400,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        className="message-box"
        sx={{
          justifyContent: "center",
          height: 300,
          // maxHeight: "75%",
          overflow: "auto",
        }}
      >
        <Grid>
          <ul>
            {messageList.map((messageData) => {
              return (
                <MessageComponent
                  key={messageData.messageId}
                  data={messageData}
                />
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

export { ChatComponent };
