import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Peer from "peerjs";
import useAuth from "../hooks/useAuth";

const VideoAudioChat = ({ userId1, userId2, username1, username2 }) => {
  const [videoToggle, setVideoToggle] = useState(true);
  const [audioToggle, setAudioToggle] = useState(true);
  const userVideoRef = useRef();
  const partnerVideoRef = useRef();
  const userNameRef = useRef();
  const partnerNameRef = useRef();
  const { auth } = useAuth();
  const { userId } = auth;

  useEffect(() => {
    // Get current username
    if (userId === userId1) {
      userNameRef.current.textContent = username1;
      partnerNameRef.current.textContent = username2;
    } else if (userId === userId2) {
      userNameRef.current.textContent = username2;
      partnerNameRef.current.textContent = username1;
    }

    const peer = new Peer(userId);

    const initVideoAudio = async () => {
      const constraints = { video: videoToggle, audio: audioToggle };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        window.localStream = stream;
        if (userVideoRef.current) userVideoRef.current.srcObject = stream;

        if (userId !== userId1) {
          const call = peer.call(userId1, stream);
          call.on("stream", (partnerStream) => {
            if (partnerVideoRef.current)
              partnerVideoRef.current.srcObject = partnerStream;
          });
        } else {
          setTimeout(() => {
            peer.on("call", (call) => {
              call.answer(stream); // Answer the call with an A/V stream.
              call.on("stream", (partnerStream) => {
                if (partnerVideoRef.current)
                  partnerVideoRef.current.srcObject = partnerStream;
              });
            });
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      initVideoAudio();
    }, 2000);

    return () => {
      peer.destroy();
      if (videoToggle) window.localStream.getVideoTracks()[0].stop();
      if (audioToggle) window.localStream.getAudioTracks()[0].stop();
    };
  });

  const handleVideoToggle = () => {
    const videoTrack = window.localStream
      .getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setVideoToggle(false);
    } else {
      videoTrack.enabled = true;
      setVideoToggle(true);
    }
  };

  const handleAudioToggle = () => {
    const audioTrack = window.localStream
      .getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setAudioToggle(false);
    } else {
      audioTrack.enabled = true;
      setAudioToggle(true);
    }
  };

  return (
    <Stack h="full" minH="full" maxH="full">
      <Flex h="full" direction="column" overflow="scroll">
        <Box>
          <video
            style={{ width: "100%" }}
            playsInline
            autoPlay
            muted
            ref={partnerVideoRef}
          />
          <p ref={partnerNameRef}></p>
        </Box>
        <Box>
          <video
            style={{ width: "100%" }}
            playsInline
            autoPlay
            muted
            ref={userVideoRef}
          />
        </Box>
        <p ref={userNameRef}></p>
      </Flex>
      <Flex pb="102">
        <Button colorScheme="teal" onClick={handleVideoToggle}>
          Toggle Video
        </Button>
        <Button colorScheme="teal" onClick={handleAudioToggle}>
          Toggle Audio
        </Button>
      </Flex>
    </Stack>
  );
};
export default VideoAudioChat;
