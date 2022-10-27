import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Peer from "simple-peer";

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

  useEffect(() => {
    // Get current username
    if (userId === userId1) usernameRef.current = username1;
    else usernameRef.current = username2;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        userVideo.current.srcObject = stream;
      });

    if (userId === userId1) {
      callUser();
    } else {
      answerCall();
    }

    return () => {
      //socket.off("receiveMessage");
      //connectionRef.current.destroy();
      //stream.getTracks().forEach(track => track.stop());
    };
  }, []);

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
  }

  function answerCall() {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    socket.on("receiveCallerSignal", (data) => {
      peer.signal(data.signalData);
    });

    peer.on("signal", (data) => {
      socket.emit("sendResponderSignal", {
        roomId: roomId,
        signalData: data
      });
    });
    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    connectionRef.current = peer;
  }

  return (
    <Box>
      <Box>
        {
          <video
            playsInline
            muted
            ref={userVideo}
            autoPlay
            style={{ width: "300px" }}
          />
        }
      </Box>
      <Box>
        {
          <video
            playsInline
            muted
            ref={partnerVideo}
            autoPlay
            style={{ width: "300px" }}
          />
        }
      </Box>
    </Box>
  );
}
export { VideoChatComponent };
