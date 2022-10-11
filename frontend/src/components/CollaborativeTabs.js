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
    <Box display="flex" flexDirection="column" width="100%">
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
      <div>
        <div style={{ display: tabIndex === "0" ? "block" : "none" }}>
          <CollaborativeCodeEditor socket={socket} collabData={collabData} />
        </div>
        <div style={{ display: tabIndex === "1" ? "block" : "none" }}>
          <CollaborativeWhiteBoard socket={socket} collabData={collabData} />
        </div>
        <div style={{ display: tabIndex === "2" ? "block" : "none" }}>
          <ChatComponent socket={socket} collabData={collabData} />
        </div>
      </div>
      <Button
        variant="contained"
        color="error"
        startIcon={<CloseSharpIcon />}
        onClick={leaveRoom}
        style={{ marginTop: "20px" }}
      >
        Leave Room
      </Button>
    </Box>
  );
};

export { CollaborativeTabs };
