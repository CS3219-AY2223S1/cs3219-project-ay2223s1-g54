import { Heading, Stack } from "@chakra-ui/react";
import BaseLayout from "../components/BaseLayout";
import RegisterForm from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <BaseLayout>
      <Stack>
        <Heading textAlign="center" color="#ffffff">
          Registration
        </Heading>
        <RegisterForm loginLink="/login" />
      </Stack>
    </BaseLayout>
  );
};

export default RegisterPage;
