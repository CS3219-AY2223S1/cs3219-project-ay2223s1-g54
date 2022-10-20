import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Tab, Tabs, Grid } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { CollaborativeCodeEditor } from "./CollaborativeCodeEditor";
import { CollaborativeWhiteBoard } from "./CollaborativeWhiteBoard";
import { ChatComponent } from "./ChatComponent";
import { InputWindow } from "./InputWindow";
import { OutputWindow } from "./OutputWindow";
import axios from "axios";

const CollaborativeTabs = (props) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState("0");
  const { userId, socket, collabData } = props;
  const { userId1, userId2 } = collabData;
  const { roomId } = collabData;
  const [processing, setProcessing] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [languageId, setLanguageId] = useState(null);
  const [code, setCode] = useState("");
  const [submits, setSubmits] = useState(0);

  useEffect(() => {
    socket.on("receiveLeaveRoom", () => {
      alert("This session will be closed");
      navigate("/matching");
    });

    socket.on("receiveSubmitCode", () => {
      setSubmits(prevSubmits => prevSubmits + 1);
    });

    return () => {
      socket.off("receiveLeaveRoom");
      socket.off("receiveSubmitCode");
    };
  }, []);

  const leaveRoom = () => {
    socket.emit("sendLeaveRoom", { roomId });
  };

  const handleTabIndexChange = (event, tabIndex) => {
    setTabIndex(tabIndex);
  };

  const handleSubmit = () => {
    socket.emit("sendSubmitCode", { roomId });
    setProcessing(true);
    const formData = {
      language_id: languageId,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(userInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log("res.data", response.data);
    //     const token = response.data.token;
    //     checkStatus(token);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     let error = err.response ? err.response.data : err;
    //     // get error status
    //     let status = err.response.status;
    //     console.log("status", status);
    //     if (status === 429) {
    //       console.log("too many requests", status);
    //     }
    //     setProcessing(false);
    //     console.log("catch block...", error);
    //   });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    }
  };

  const showSubmitButton = () => {
    return (userId == userId1 && submits == 0) || (userId == userId2 && submits == 1);
  }

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
        setCode={setCode}
        setLanguageId={setLanguageId}
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <InputWindow
            userInput={userInput}
            setUserInput={setUserInput}
          />
          </Grid>
          <Grid item xs={6}>
          <OutputWindow
            outputDetails={outputDetails}
          />
          </Grid>
        </Grid>
        {showSubmitButton() && 
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<UploadFileIcon />}
            style={{ marginTop: "20px", marginLeft: "20px" }}
          >
            {processing ? "Processing..." : "Submit Code"}
          </Button>
        }
        <Button
          variant="contained"
          color="error"
          startIcon={<CloseSharpIcon />}
          onClick={leaveRoom}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          Leave Room
        </Button>
      </Box>
    </Box>
  );
};

export { CollaborativeTabs };
