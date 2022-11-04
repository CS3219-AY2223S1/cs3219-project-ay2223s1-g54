import { Link as RouterLink } from "react-router-dom";
import { HStack, Link, Stack, Text } from "@chakra-ui/react";
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
        <Text align="center">
          {"Already a user? "}
          <Link color="blue.400" as={RouterLink} to={props.loginLink}>
            Sign In
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};

export default RegisterForm;
