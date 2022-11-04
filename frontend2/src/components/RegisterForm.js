import { Link as RouterLink } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import PasswordFormControl from "./formcontrols/PasswordFormControl";
import SubmitFormControl from "./formcontrols/SubmitFormControl";

export const RegisterForm = (props) => {
  return (
    <Stack spacing="4">
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input type="text" />
      </FormControl>
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
