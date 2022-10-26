import { HStack, Stack } from "@chakra-ui/react";
import AlternativeSubmitFormControl from "./formcontrols/AlternativeSubmitFormControl";
import EmailFormControl from "./formcontrols/EmailFormControl";
import TextFormControl from "./formcontrols/TextFormControl";
import PasswordFormControl from "./formcontrols/PasswordFormControl";
import SubmitFormControl from "./formcontrols/SubmitFormControl";

export const RegisterForm = (props) => {
  return (
    <Stack spacing="4">
      <EmailFormControl />
      <TextFormControl title="Username" />
      <HStack>
        <PasswordFormControl />
        <PasswordFormControl title="Confirm Password" />
      </HStack>
      <SubmitFormControl title="Sign Up" />
      <Stack pt="5">
        <AlternativeSubmitFormControl
          caption="Already a user?"
          title="Sign Up"
          link={props.loginLink}
        />
      </Stack>
    </Stack>
  );
};

export default RegisterForm;
