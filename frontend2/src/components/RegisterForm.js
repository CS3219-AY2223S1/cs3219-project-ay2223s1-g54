import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import PasswordFormControl from "./formcontrols/PasswordFormControl";

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
      <Button
        size="lg"
        color="white"
        bg="green.400"
        _hover={{
          bg: "green.500",
        }}
      >
        Sign Up
      </Button>
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
