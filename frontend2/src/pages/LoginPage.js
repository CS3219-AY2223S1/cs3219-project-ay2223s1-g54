import { Heading, Stack } from "@chakra-ui/react";
import BaseLayout from "../components/BaseLayout";
import LoginForm from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <BaseLayout>
      <Stack>
        <Heading textAlign="center" color="#ffffff">
          Login Portal
        </Heading>
        <LoginForm registerLink="/register" />
      </Stack>
    </BaseLayout>
  );
};

export default LoginPage;
