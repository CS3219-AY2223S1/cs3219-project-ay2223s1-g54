import { useRef, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
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
import { URL_USER_RESET_PASSWORD } from "../configs";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ResetPasswordPage = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResettingPassowrd, setIsResettingPassword] = useState(false);
  const passwordFieldRef = useRef();
  const confirmPasswordFieldRef = useRef();
  const toast = useToast();
  const { userId, token } = useParams();
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

    if (passwordFieldRef.current.value === "") {
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

  const handlePasswordReset = async () => {
    setIsResettingPassword(true);

    const validationResult = validateFields();
    if (!validationResult) return;

    const toastData = {
      title: "",
      description: "",
      status: "",
      duration: 3000,
      isClosable: true,
    };

    try {
      const resetUrl = `${URL_USER_RESET_PASSWORD}/${userId}/${token}`;
      const newPassword = passwordFieldRef.current.value;
      await axiosPublic.post(resetUrl, { newPassword });
      toastData.name = "Success";
      toastData.description = "Your password has been changed";
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

    setIsResettingPassword(false);
  };

  return (
    <Stack spacing="4">
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
        isLoading={isResettingPassowrd}
        onClick={handlePasswordReset}
      >
        Reset Password
      </Button>
      <Stack pt="5">
        <Text align="center">
          <Link color="blue.400" as={RouterLink} to={props.loginLink}>
            Back to Login
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};

export default ResetPasswordPage;
