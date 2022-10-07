import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  listItemClasses,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import socket from "../socket.js";
import MessageComponent from "./MessageComponent.js";

function ChatComponent() {
  const cookies = new Cookies();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  // socket.get().on("code-event", ({ message }) => {
  //   //update the event
  //   updateMessageList(message);
  // });

  const updateMessageList = (message) => {
    setMessageList((list) => [...list, message]);
  };

  const sendMessage = () => {
    // TODO
    // socket.get().emit("code-event1", {
    //   room_id: localStorage.getItem("room_id"),
    //   name: "", //TODO
    //   message: "",
    //   time: "",
    // });
    updateMessageList({
      room_id: localStorage.getItem("room_id"),
      message_id: messageList.length,
      name: "", //TODO
      message: message,
      time: "",
    });
    setMessage("");
  };

  return (
    <Box
      className="chat-box"
      sx={{
        height: "50%",
        width: "30%",
      }}
    >
      <Box className="message-box" sx={{ flexGrow: 1 }}>
        <Grid>
          <ul>
            {messageList.map((message) => {
              return (
                <MessageComponent key={message.message_id} data={message} />
              );
            })}
          </ul>
        </Grid>
      </Box>
      <Box className="message-input" sx={{ flexDirection: "row" }}>
        <TextField
          label="Type Message"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginBottom: "2rem" }}
          multiline
        />
        <Button variant={"outlined"} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ChatComponent;
