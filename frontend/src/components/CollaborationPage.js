import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import socket from "../socket.js";

function CollaborationPage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/matching");
  };

  socket.get().on("code-event", ({ newCode }) => {
    updateCodeFromSockets(newCode);
  });

  const updateCodeFromSockets = (newCode) => {
    setCode(newCode);
  };

  const updateCodeInState = (newCode, event) => {
    setCode(newCode);
    socket
      .get()
      .emit("code-event1", {
        room_id: localStorage.getItem("room_id"),
        newCode,
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") == null) navigate("/login");
  });

  return (
    <Box display={"flex"} flexDirection={"column"} width={"90%"}>
      <div>
        <Editor
          height="80vh"
          value={code}
          defaultLanguage="javascript"
          onChange={updateCodeInState}
        />
      </div>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleCancel()}
          startIcon={<CloseSharpIcon />}
        >
          back
        </Button>
      </Box>
    </Box>
  );
}

export default CollaborationPage;
