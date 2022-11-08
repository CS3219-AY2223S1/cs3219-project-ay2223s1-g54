import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  useToast,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { URL_USER_RESET_PASSWORD } from "../configs";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ForgetPasswordForm = (props) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const emailFieldRef = useRef();
  const toast = useToast();
  const axiosPublic = useAxiosPublic();

  const handleForgetPassword = async () => {
    setIsSendingEmail(true);

    const toastData = {
      title: "",
      description: "",
      status: "",
      duration: 3000,
      isClosable: true,
    };

    try {
      const email = emailFieldRef.current.value;
      await axiosPublic.post(URL_USER_RESET_PASSWORD, { email });
      toastData.status = "success";
      toastData.title = "Success";
      toastData.description = "We have sent an e-mail to reset your password";
    } catch (err) {
      toastData.status = "error";
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        toastData.title = name;
        toastData.description = message;
      } else {
        toastData.title = "Unknown Error";
        toastData.description = "Please try again later";
      }
    }

    toast(toastData);
    setIsSendingEmail(false);
  };

  return (
    <Stack spacing="4">
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" ref={emailFieldRef} />
      </FormControl>
      <Button
        size="lg"
        color="white"
        bg="green.400"
        _hover={{
          bg: "green.500",
        }}
        isLoading={isSendingEmail}
        onClick={handleForgetPassword}
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

export default ForgetPasswordForm;
