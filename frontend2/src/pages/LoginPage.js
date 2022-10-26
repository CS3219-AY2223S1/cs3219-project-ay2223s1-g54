import { Flex, Heading, Stack } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="#39424e">
      <Stack>
        <Heading textAlign="center" color="#ffffff">
          Login Portal
        </Heading>
        <LoginForm registerLink="/register" />
      </Stack>
    </Flex>
  );
};

export default LoginPage;
