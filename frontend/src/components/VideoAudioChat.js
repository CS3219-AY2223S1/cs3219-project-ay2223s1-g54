import { useEffect, useRef, useState } from "react";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { MdMicNone, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
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

    let dispose = () => {};
    if (userId !== userId1) {
      setTimeout(() => {
        navigator.getUserMedia(
          { video: true, audio: true },
          (stream) => {
            window.localStream = stream;
            showVideo(stream, userVideoRef.current, true);
            dispose = showStream(
              peer.call(userId1, stream),
              partnerVideoRef.current
            );
          },
          (error) => {
            console.log("Failed to get local stream", error);
          }
        );
      }, 3000);
      return () => {
        dispose();
        peer.destroy();
        if (window.localStream) {
          window.localStream.getVideoTracks().forEach((track) => track.stop());
          window.localStream.getAudioTracks().forEach((track) => track.stop());
        }
      };
    } else {
      const handler = (call) => {
        navigator.getUserMedia(
          { video: true, audio: true },
          (stream) => {
            window.localStream = stream;
            showVideo(stream, userVideoRef.current, true);
            call.answer(stream);
          },
          (error) => {
            console.log("Failed to get local stream", error);
          }
        );

        dispose = showStream(call, partnerVideoRef.current);
      };

      peer.on("call", handler);

      return () => {
        dispose();
        peer.off("call", handler);
        peer.destroy();
        if (window.localStream) {
          window.localStream.getVideoTracks().forEach((track) => track.stop());
          window.localStream.getAudioTracks().forEach((track) => track.stop());
        }
      };
    }
  }, []);

  const showVideo = (stream, video, muted) => {
    video.srcObject = stream;
    video.volume = muted ? 0 : 1;
    video.onloadedmetadata = () => video.play();
  };

  const showStream = (call, otherVideo) => {
    const handler = (remoteStream) => {
      showVideo(remoteStream, otherVideo, false);
    };
    call.on("stream", handler);

    return () => call.off("stream", handler);
  };

  const handleVideoToggle = () => {
    window.localStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !videoToggle));
    setVideoToggle(!videoToggle);
  };

  const handleAudioToggle = () => {
    window.localStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !audioToggle));
    setAudioToggle(!audioToggle);
  };

  return (
    <Stack h="full" minH="full" maxH="full">
      <Flex h="full" direction="column" alignItems="center" overflow="scroll">
        <video style={{ width: "100%", height: "30%" }} ref={partnerVideoRef} />
        <p ref={partnerNameRef}></p>
        <video style={{ width: "100%", height: "30%" }} ref={userVideoRef} />
        <p ref={userNameRef}></p>
        <Flex>
          <Button
            size="lg"
            colorScheme="teal"
            mt="5"
            mr="5"
            onClick={handleVideoToggle}
          >
            {videoToggle ? <MdVideocam /> : <MdVideocamOff />}
          </Button>
          <Button
            size="lg"
            colorScheme="teal"
            mt="5"
            ml="5"
            onClick={handleAudioToggle}
          >
            {audioToggle ? <MdMicNone /> : <MdMicOff />}
          </Button>
        </Flex>
      </Flex>
    </Stack>
  );
};
export default VideoAudioChat;
