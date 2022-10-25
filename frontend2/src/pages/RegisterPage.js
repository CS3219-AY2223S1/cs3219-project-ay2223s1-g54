import { Flex, Heading, Stack } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

export const RegisterPage = () => {
  const handleSignup = () => {};

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#39424e">
      <Stack>
        <Heading textAlign="center" color="#ffffff">
          Registration
        </Heading>
        <RegisterForm signupClick={handleSignup} loginLink="/login" />
      </Stack>
    </Flex>
  );
};

export default RegisterPage;
