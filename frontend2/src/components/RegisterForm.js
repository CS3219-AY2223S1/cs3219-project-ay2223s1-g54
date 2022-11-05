import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  useToast,
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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { URL_USER_SVC_CREATE_USER } from "../configs";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const RegisterForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailFieldRef = useRef();
  const usernameFieldRef = useRef();
  const passwordFieldRef = useRef();
  const confirmPasswordFieldRef = useRef();
  const toast = useToast();
  const axiosPublic = useAxiosPublic();

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  };

  const validateFields = () => {
    const errorToastData = {
      title: "Validation Failed",
      description: "",
      status: "error",
      duration: 3000,
      isClosable: true,
    };

    // check for empty fields
    if (emailFieldRef.current.value === "") {
      errorToastData.description = "Email field cannot be empty";
      toast(errorToastData);
      return false;
    } else if (usernameFieldRef.current.value === "") {
      errorToastData.description = "Username field cannot be empty";
      toast(errorToastData);
      return false;
    } else if (passwordFieldRef.current.value === "") {
      errorToastData.description = "Password field cannot be empty";
      toast(errorToastData);
      return false;
    } else if (confirmPasswordFieldRef.current.value === "") {
      errorToastData.description = "Confirm Password field cannot be empty";
      toast(errorToastData);
      return false;
    }

    // check if both password and confirm password were equal
    if (
      passwordFieldRef.current.value !== confirmPasswordFieldRef.current.value
    ) {
      errorToastData.description = "Password fields must match";
      toast(errorToastData);
      return false;
    }

    return true;
  };

  const handleRegistration = async () => {
    const validationResult = validateFields();
    if (!validationResult) return;

    const toastData = {
      title: "",
      description: "",
      status: "",
      duration: 3000,
      isClosable: true,
    };

    const registrationData = {
      email: emailFieldRef.current.value,
      username: usernameFieldRef.current.value,
      password: passwordFieldRef.current.value,
    };

    try {
      await axiosPublic.post(URL_USER_SVC_CREATE_USER, registrationData);
      toastData.name = "Success";
      toastData.description =
        "Account successfully created! Please check your email";
      toastData.status = "success";
      toast(toastData);
    } catch (err) {
      toastData.status = "error";
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        toastData.title = name;
        toastData.description = message;
        toast(toastData);
        return;
      }
      toastData.title = "Unknown Error";
      toastData.description = "Please try again later";
      return;
    }
  };

  return (
    <Stack spacing="4">
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" ref={emailFieldRef} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input type="text" ref={usernameFieldRef} />
      </FormControl>
      <HStack>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              ref={passwordFieldRef}
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
              type={showConfirmPassword ? "text" : "password"}
              ref={confirmPasswordFieldRef}
            />
            <InputRightElement h="full">
              <Button variant="ghost" onClick={toggleShowConfirmPassword}>
                {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </HStack>
      <Button
        size="lg"
        color="white"
        bg="green.400"
        _hover={{
          bg: "green.500",
        }}
        onClick={handleRegistration}
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
