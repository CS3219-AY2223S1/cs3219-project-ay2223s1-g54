import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Select, Stack } from "@chakra-ui/react";

const MatchForm = () => {
  const [isMatching, setIsMatching] = useState(false);
  const difficultyFieldRef = useRef();
  const matchBtnRef = useRef();
  const navigate = useNavigate();

  const handleMatch = () => {
    setIsMatching(true);
    // const difficulty = difficultyFieldRef.current.value;
    // navigate("/matching", { state: { difficulty } });
  };

  const handleMatchCancel = () => {
    setIsMatching(false);
  };

  return (
    <Stack spacing="4">
      <Select variant="filled" isDisabled={isMatching} ref={difficultyFieldRef}>
        <option value="0">Easy</option>
        <option value="1">Medium</option>
        <option value="2">Hard</option>
        <option value="3">Random</option>
      </Select>
      <Button
        size="lg"
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
        variant="outline"
        size="lg"
        isDisabled={!isMatching}
        onClick={handleMatchCancel}
      >
        Cancel
      </Button>
    </Stack>
  );
};

export default MatchForm;
