import { Link as RouterLink } from "react-router-dom";
import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import PasswordFormControl from "./formcontrols/PasswordFormControl";
import SubmitFormControl from "./formcontrols/SubmitFormControl";

export const LoginForm = (props) => {
  return (
    <Stack spacing="4">
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" />
      </FormControl>
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
        <Text align="center">
          {"Not a user? "}
          <Link color="blue.400" as={RouterLink} to={props.registerLink}>
            Sign Up
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
