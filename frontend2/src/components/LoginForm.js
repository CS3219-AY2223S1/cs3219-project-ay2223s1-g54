import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const LoginForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <Stack spacing="4">
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={showPassword ? "text" : "password"} />
          <InputRightElement h="full">
            <Button variant="ghost" onClick={toggleShowPassword}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Stack
        direction={{ base: "column", sm: "row" }}
        align="start"
        justify="space-between"
      >
        <Checkbox>Remember Me</Checkbox>
        <Link color="blue.400">Forgot Password?</Link>
      </Stack>
      <Button
        size="lg"
        color="white"
        bg="green.400"
        _hover={{
          bg: "green.500",
        }}
      >
        Sign In
      </Button>
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
