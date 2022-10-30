import { Box, Button, TextField, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Peer from "simple-peer";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";

function VideoChatComponent(props) {
  const { auth } = useAuth();
  const [stream, setStream] = useState();
  const usernameRef = useRef();
  const { userId, socket } = auth;
  const collabData = props.collabData;
  const { roomId, userId1, username1, username2 } = collabData;


  const userVideo = useRef();
  const partnerVideo = useRef();
  const connectionRef = useRef();

  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  useEffect(() => {
    // Get current username
    if (userId === userId1) usernameRef.current = username1;
    else usernameRef.current = username2;

    navigator.mediaDevices
      .getUserMedia({ video: cam, audio: mic })
      .then((stream) => {
        setStream(stream);
        if (stream) {
          userVideo.current.srcObject = stream;
        }
      })
      .catch(console.log);

    // if (userId === userId1) callUser();
    // // } else {
    // //   answerCall();
    // // }

    // socket.on("receiveCallerSignal", (data) => {
    //   if (userId !== userId1) {
    //     console.log("receive signal data");
    //     answerCall(data);
    //   }
    // });

    // if (connectionRef.cuurent) {
    //   connectionRef.current.on("stream", (stream) => {
    //     if (stream) {
    //       partnerVideo.current.srcObject = stream;
    //     }
    //   });
    // }

    return () => {
      //stream.getTracks().forEach(track => track.stop());
      //socket.off("receiveMessage");
      //connectionRef.current.destroy();
      //handleStreamStop();
    };
  }, []);

  useEffect(() => {
    const peer = new Peer({
      initiator: userId === userId1,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      if (userId === userId1) {
        socket.emit("sendCallerSignal", {
          roomId: roomId,
          signalData: data,
        });
      } else {
        socket.emit("sendResponderSignal", {
          roomId: roomId,
          signalData: data,
        });
      }
    });

    peer.on("stream", (stream) => {
      if (stream) {
      partnerVideo.current.srcObject = stream;
    }
    });

    socket.on("receiveResponderSignal", (data) => {
      if (userId === userId1) {
        peer.signal(data.signalData);
      }
    });

    socket.on("receiveCallerSignal", (data) => {
      if (userId !== userId1) {
        peer.signal(data.signalData);
      }
    });

    connectionRef.current = peer;


    return () => {
      // stream.getTracks().forEach(track => track.stop());
      // socket.off("receiveMessage");
      // connectionRef.current.destroy();
      //handleStreamStop();
    };


  }, []);

  

  //User with userId1 will make the call
  function callUser() {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("sendCallerSignal", {
        roomId: roomId,
        signalData: data,
      });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    socket.on("receiveResponderSignal", (data) => {
      peer.signal(data.signalData);
    });

    connectionRef.current = peer;
    console.log(peer);
  }

  //User with userId2 will answer the call
  function answerCall(data) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    // socket.on("receiveCallerSignal", (data) => {
    //   console.log(data.signalData);
    //   peer.signal(data.signalData);
    // });

    peer.on("signal", (data) => {
      socket.emit("sendResponderSignal", {
        roomId: roomId,
        signalData: data,
      });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });
    peer.signal(data.signalData);
    connectionRef.current = peer;
    console.log(peer);
  }

  const handleVideoToggle = () => {
    const videoTrack = stream
      .getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setCam(false);
    } else {
      videoTrack.enabled = true;
      setCam(true);
    }
  };

  const handleAudioToggle = () => {
    const audioTrack = stream
      .getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setMic(false);
    } else {
      audioTrack.enabled = true;
      setMic(true);
    }
  };

  const handleStreamStop = () => {
    stream.getTracks().forEach((track) => track.stop());
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {
          <video
            playsInline
            muted
            ref={userVideo}
            autoPlay
            style={{ width: "300px" }}
          />
        }
        {
          <video
            playsInline
            ref={partnerVideo}
            autoPlay
            style={{ width: "300px" }}
          />
        }
      </Box>
      <IconButton size="middle" onClick={handleVideoToggle}>
        {cam ? <VideocamIcon /> : <VideocamOffIcon />}
      </IconButton>
      <IconButton size="middle" onClick={handleAudioToggle}>
        {mic ? <MicIcon /> : <MicOffIcon />}
      </IconButton>
      <Button onClick={callUser}>Call</Button>
      <Button onClick={answerCall}>Anwser</Button>
    </Box>
  );
}
export { VideoChatComponent };
