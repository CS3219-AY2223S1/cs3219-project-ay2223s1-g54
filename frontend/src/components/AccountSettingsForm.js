import { useRef, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  useToast,
  Button,
  Divider,
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
import { URL_USER_SVC_DELETE_USER, URL_USER_SVC_UPDATE_USER } from "../configs";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AccountSettingsForm = (props) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const newPasswordFieldRef = useRef();
  const oldPasswordFieldRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const toggleShowOldPassword = () => {
    setShowOldPassword((showOldPassword) => !showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((showNewPassword) => !showNewPassword);
  };

  const validateFields = () => {
    const errorToastData = {
      title: "Validation Failed",
      description: "",
      status: "error",
      duration: 3000,
      isClosable: true,
    };

    if (oldPasswordFieldRef.current.value === "") {
      errorToastData.description = "Old Password field cannot be empty";
      toast(errorToastData);
      return false;
    } else if (newPasswordFieldRef.current.value === "") {
      errorToastData.description = "New Password field cannot be empty";
      toast(errorToastData);
      return false;
    }

    return true;
  };

  const handlePasswordUpdate = async () => {
    setIsUpdatingPassword(true);

    const validationResult = validateFields();
    if (!validationResult) {
      setIsUpdatingPassword(false);
      return;
    }

    const toastData = {
      title: "",
      description: "",
      status: "",
      duration: 3000,
      isClosable: true,
    };

    try {
      const newPassword = newPasswordFieldRef.current.value;
      const oldPassword = oldPasswordFieldRef.current.value;
      await axiosPrivate.post(URL_USER_SVC_UPDATE_USER, {
        newPassword,
        oldPassword,
      });
      toastData.status = "success";
      toastData.title = "Success";
      toastData.description = "Your password has been changed";
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
    setIsUpdatingPassword(false);
  };

  const handleAccountDelete = async () => {
    setIsDeletingAccount(true);

    const toastData = {
      title: "",
      description: "",
      status: "",
      duration: 3000,
      isClosable: true,
    };

    try {
      await axiosPrivate.post(URL_USER_SVC_DELETE_USER);
      setAuth({});
      navigate("/login");
      toastData.status = "success";
      toastData.title = "Success";
      toastData.description = "Your account has been deleted";
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
    setIsDeletingAccount(false);
  };

  return (
    <Stack spacing="4">
      <HStack>
        <FormControl isRequired>
          <FormLabel>Old Password</FormLabel>
          <InputGroup>
            <Input
              type={showOldPassword ? "text" : "password"}
              ref={oldPasswordFieldRef}
            />
            <InputRightElement h="full">
              <Button variant="ghost" onClick={toggleShowOldPassword}>
                {showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              type={showNewPassword ? "text" : "password"}
              ref={newPasswordFieldRef}
            />
            <InputRightElement h="full">
              <Button variant="ghost" onClick={toggleShowNewPassword}>
                {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
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
        isLoading={isUpdatingPassword}
        onClick={handlePasswordUpdate}
      >
        Update Password
      </Button>
      <Divider orientation="horizontal" />
      <Button
        size="lg"
        color="white"
        bg="red.400"
        _hover={{
          bg: "red.500",
        }}
        isLoading={isDeletingAccount}
        onClick={handleAccountDelete}
      >
        Delete Account
      </Button>
      <Divider orientation="horizontal" />
      <Stack pt="5">
        <Text align="center">
          <Link color="blue.400" as={RouterLink} to={props.homeLink}>
            Back to Home
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};

export default AccountSettingsForm;
