import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Tab, Tabs } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { CollaborativeCodeEditor } from "./CollaborativeCodeEditor";
import { CollaborativeWhiteBoard } from "./CollaborativeWhiteBoard";
import { ChatComponent } from "./ChatComponent";

const CollaborativeTabs = (props) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState("0");
  const { socket, collabData } = props;
  const { roomId } = collabData;

  useEffect(() => {
    socket.on("receiveLeaveRoom", () => {
      alert("This session will be closed");
      navigate("/matching");
    });

    return () => {
      socket.off("receiveLeaveRoom");
    };
  }, []);

  const leaveRoom = () => {
    socket.emit("sendLeaveRoom", { roomId });
  };

  const handleTabIndexChange = (event, tabIndex) => {
    setTabIndex(tabIndex);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      maxHeight="100%"
      backgroundColor="white"
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabIndexChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="0" label="Code Editor" />
        <Tab value="1" label="White Board" />
        <Tab value="2" label="Chat" />
      </Tabs>

      <CollaborativeCodeEditor
        hidden={tabIndex === "0" ? true : false}
        socket={socket}
        collabData={collabData}
      />
      <CollaborativeWhiteBoard
        hidden={tabIndex === "1" ? true : false}
        socket={socket}
        collabData={collabData}
      />
      <ChatComponent
        hidden={tabIndex === "2" ? true : false}
        socket={socket}
        collabData={collabData}
      />

      <Box
        display="flex"
        flexDirection="row-reverse"
        style={{ background: "#F1DDBF" }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<CloseSharpIcon />}
          onClick={leaveRoom}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          Leave Room
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            alert("Coming soon");
          }}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          Submit Code
        </Button>
      </Box>
    </Box>
  );
};

export { CollaborativeTabs };
