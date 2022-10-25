import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const RegisterForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const toast = useToast();

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  };

  const handleSignup = () => {
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast({
        title: "Failed Validation",
        description: "Password fields does not match",
        status: "error",
        isClosable: true,
      });
      return;
    }

    props.signupClick();
  };

  return (
    <Box p="8" bg="white" rounded="lg" boxShadow="lg">
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
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h="full">
                <Button variant="ghost" onClick={toggleShowPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                ref={confirmPasswordRef}
                type={showConfirmPassword ? "text" : "password"}
              />
              <InputRightElement h="full">
                <Button variant="ghost" onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </HStack>
        <Stack pt="2">
          <Button
            size="lg"
            color="white"
            bg="green.400"
            _hover={{
              bg: "green.500",
            }}
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </Stack>
        <Stack pt="5">
          <Text align="center">
            {"Already a user? "}
            <Link color="blue.400" as={RouterLink} to={props.loginLink}>
              Login
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
