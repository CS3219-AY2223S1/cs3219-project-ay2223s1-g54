import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import BaseLayout from "../components/layouts/BaseLayout";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <BaseLayout>
      <Box
        minHeight="100%"
        maxHeight="100%"
        h="100%"
        as={Flex}
        justify="center"
        align="center"
        w="500px"
      >
        <Stack bg="white" p="10" mt="150">
          <Heading>PeerPrep</Heading>
          <Image src="assets/LandingPage.png" />
          <Text>
            PeerPrep is the best interview preparation platform and a peer
            matching system where everyone such as yourself can find peers to
            practice whiteboard-style interview coding questions together. Sign
            up now to expand your algorithm knowledge and prepare for technical
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
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button variant="outline" size="lg" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </BaseLayout>
  );
};

export default LandingPage;
