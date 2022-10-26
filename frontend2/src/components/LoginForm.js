import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

export const LoginForm = (props) => {
  return (
    <Box p="8" bg="white" rounded="lg" boxShadow="lg">
      <Stack spacing="4">
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing="10">
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
        </Stack>
        <Stack pt="5">
          <Text align="center">
            {"Not a user? "}
            <Link color="blue.400" as={RouterLink} to={props.registerLink}>
              Sign Up
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginForm;
