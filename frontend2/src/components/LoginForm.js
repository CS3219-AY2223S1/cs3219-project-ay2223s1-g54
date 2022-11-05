import { useEffect, useRef, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { decodeToken } from "react-jwt";
import {
  useToast,
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
import { io } from "socket.io-client";
import { URI_GATEWAY, URL_AUTH_SVC_LOGIN_USER } from "../configs";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const LoginForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const emailFieldRef = useRef();
  const passwordFieldRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const { setAuth, persist, setPersist } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const handleLogin = async () => {
    const toastData = {
      title: "",
      description: "",
      status: "",
      duration: 3000,
      isClosable: true,
    };

    try {
      const loginData = {
        email: emailFieldRef.current.value,
        password: passwordFieldRef.current.value,
      };
      const res = await axiosPublic.post(URL_AUTH_SVC_LOGIN_USER, loginData);
      const { accessToken } = res.data;
      const { userId, username } = decodeToken(accessToken);

      const socket = io(URI_GATEWAY);
      socket.on("connect", () => {
        socket.emit("clientConnected", { socketId: socket.id, userId });
      });

      setAuth({ accessToken, userId, username, socket });
      navigate("/home");
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
      <Stack
        direction={{ base: "column", sm: "row" }}
        align="start"
        justify="space-between"
      >
        <Checkbox isChecked={persist} onChange={togglePersist}>
          Remember Me
        </Checkbox>
        <Link color="blue.400">Forgot Password?</Link>
      </Stack>
      <Button
        size="lg"
        color="white"
        bg="green.400"
        _hover={{
          bg: "green.500",
        }}
        onClick={handleLogin}
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
