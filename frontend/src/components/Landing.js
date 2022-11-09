import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignInLink = () => {
    navigate("/login");
  };

  const handleSignUpLink = () => {
    navigate("/register");
  };

  return (
    <Stack bg="white" alignItems="center">
      <Heading>PeerPrep</Heading>
      <Image boxSize="150px" src="assets/LandingPage.png" />
      <Text textAlign="justify">
        <em>PeerPrep</em> is the best interview preparation platform and a peer
        matching system where everyone such as yourself can find peers to
        practice whiteboard-style interview coding questions together.
      </Text>
      <Text>
        Sign up now to expand your algorithm knowledge and prepare for technical
        interviews.
      </Text>
      <Stack pt="5">
        <Box align="center" justify="center">
          <ButtonGroup gap="4">
            <Button
              variant="solid"
              size="lg"
              color="white"
              bg="green.400"
              _hover={{
                bg: "green.500",
              }}
              onClick={handleSignInLink}
            >
              Sign In
            </Button>
            <Button
              variant="solid"
              size="lg"
              color="white"
              bg="cyan.400"
              _hover={{
                bg: "cyan.500",
              }}
              onClick={handleSignUpLink}
            >
              Sign Up
            </Button>
          </ButtonGroup>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Landing;
