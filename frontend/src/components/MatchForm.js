import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Button, Flex, Select, Stack } from "@chakra-ui/react";
import MatchTimer from "./MatchTimer";
import useAuth from "../hooks/useAuth";

const MatchForm = () => {
  const [isMatching, setIsMatching] = useState(false);
  const difficultyFieldRef = useRef();
  const matchBtnRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const { auth } = useAuth();
  const { userId, username, socket } = auth;

  useEffect(() => {
    socket.on("readyForCollab", (collabData) => {
      navigate("/collaboration", { state: { collabData } });
    });
  }, []);

  const handleMatch = () => {
    setIsMatching(true);
    const difficulty = difficultyFieldRef.current.value;
    socket.emit("findMatch", { difficulty, userId, username });
  };

  const handleMatchCancel = () => {
    setIsMatching(false);
  };

  const handleMatchExpired = () => {
    handleMatchCancel();

    const expiredToastData = {
      title: "Match Expired",
      description: "Unable to find any match",
      status: "info",
      duration: 3000,
      isClosable: true,
    };
    toast(expiredToastData);
  };

  return (
    <Stack spacing="4">
      <Select variant="filled" isDisabled={isMatching} ref={difficultyFieldRef}>
        <option value="0">Easy</option>
        <option value="1">Medium</option>
        <option value="2">Hard</option>
        <option value="3">Random</option>
      </Select>
      {isMatching && <MatchTimer onMatchExpiry={handleMatchExpired} />}
      <Flex>
        <Button
          w="100%"
          mr="5"
          color="white"
          bg="green.400"
          _hover={{
            bg: "green.500",
          }}
          isLoading={isMatching}
          loadingText="Looking for a match"
          onClick={handleMatch}
          ref={matchBtnRef}
        >
          Match
        </Button>
        <Button
          w="100%"
          mr="5"
          variant="outline"
          isDisabled={!isMatching}
          onClick={handleMatchCancel}
        >
          Cancel
        </Button>
      </Flex>
    </Stack>
  );
};

export default MatchForm;
