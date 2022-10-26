import { Checkbox, Link, Stack } from "@chakra-ui/react";
import AlternativeSubmitFormControl from "./formcontrols/AlternativeSubmitFormControl";
import EmailFormControl from "./formcontrols/EmailFormControl";
import PasswordFormControl from "./formcontrols/PasswordFormControl";
import SubmitFormControl from "./formcontrols/SubmitFormControl";

export const LoginForm = () => {
  return (
    <Stack spacing="4">
      <EmailFormControl />
      <PasswordFormControl />
      <Stack
        direction={{ base: "column", sm: "row" }}
        align="start"
        justify="space-between"
      >
        <Checkbox>Remember Me</Checkbox>
        <Link color="blue.400">Forgot Password?</Link>
      </Stack>
      <SubmitFormControl title="Sign In" />
      <Stack pt="5">
        <AlternativeSubmitFormControl
          caption="Not a user?"
          title="Sign Up"
          link="/register"
        />
      </Stack>
    </Stack>
  );
};

export default LoginForm;
