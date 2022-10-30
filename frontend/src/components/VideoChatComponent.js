import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Peer from "peerjs";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";

function VideoChatComponent(props) {
  const { auth } = useAuth();
  const [stream, setStream] = useState();
  const usernameRef = useRef();
  const partnerNameRef = useRef();
  const { userId, socket } = auth;
  const collabData = props.collabData;
  const { roomId, userId1, username1, username2 } = collabData;

  const userVideo = useRef();
  const partnerVideo = useRef();

  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  useEffect(() => {
    // Get current username
    if (userId === userId1) {
      usernameRef.current = username1;
      partnerNameRef.current = username2;
    } else {
      usernameRef.current = username2;
      partnerNameRef.current = username1;
    }

    const peer = new Peer(userId);

    navigator.mediaDevices
      .getUserMedia({ video: cam, audio: mic })
      .then((stream) => {
        setStream(stream);
        if (stream) {
          userVideo.current.srcObject = stream;
        }
        if (userId !== userId1) {
          const call = peer.call(userId1, stream);

          call.on("stream", (stream) => {
            partnerVideo.current.srcObject = stream;
          });
        } else {
          peer.on("call", (call) => {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on("stream", (stream) => {
              partnerVideo.current.srcObject = stream;
            });
          });
        }
      })
      .catch(console.log);


    return () => {
      peer.destroy();
      
      // Can't get stream to work
      // stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

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

  const handleStreamStop = (stream) => {
    stream.getTracks().forEach((track) => track.stop());
  };

  return (
    <Box
      height={props.hidden === true ? "100%" : "0"}
      visibility={props.hidden === true ? "none" : "hidden"}
      maxHeight="100%"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 1,
            m: 1,
            width: "40%",
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <video
            playsInline
            muted
            ref={userVideo}
            autoPlay
            style={{ width: "100%" }}
          />
          <Typography
            component="h4"
            variant="h5"
            sx={{ mt: 2 }}
            textAlign="center"
          >
            {usernameRef.current}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 1,
            m: 1,
            width: "40%",
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <video
            playsInline
            ref={partnerVideo}
            autoPlay
            style={{ width: "100%" }}
          />
          <Typography
            component="h4"
            variant="h5"
            sx={{ mt: 2 }}
            textAlign="center"
          >
            {partnerNameRef.current}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <IconButton size="large" onClick={handleVideoToggle}>
          {cam ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <IconButton size="large" onClick={handleAudioToggle}>
          {mic ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
export { VideoChatComponent };
