import { useNavigate } from "react-router-dom";
import {
  useToast,
  Box,
  Button,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import HistoryPane from "../HistoryPane";
import MatchForm from "../MatchForm";
import Navbar from "../Navbar";
import BaseLayout from "../layouts/BaseLayout";
import { URL_AUTH_SVC_LOGOUT_USER } from "../../configs";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const HomePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { username } = auth;

  const handleQuestionBank = () => {
    navigate("/questionBank");
  };

  const handleAccountSettings = () => {
    navigate("/accountSettings");
  };

  const handleLogout = async () => {
    const toastData = {
      title: "Logout Success",
      description: "User logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    };

    await axiosPrivate.post(URL_AUTH_SVC_LOGOUT_USER);
    setAuth({});
    navigate("/login");
    toast(toastData);
  };

  return (
    <BaseLayout>
      <Navbar>
        <Menu>
          <MenuButton
            colorScheme="gray.800"
            as={Button}
            _hover={{ bg: "gray.600" }}
          >
            {username}
          </MenuButton>
          <MenuList bg="gray.800" borderColor="gray.900" alignItems="center">
            <MenuItem
              _focus={{ bg: "gray.600" }}
              _hover={{ bg: "gray.600" }}
              onClick={handleQuestionBank}
            >
              Question Bank
            </MenuItem>
            <MenuItem
              _focus={{ bg: "gray.600" }}
              _hover={{ bg: "gray.600" }}
              onClick={handleAccountSettings}
            >
              Account Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _focus={{ bg: "gray.600" }}
              _hover={{ bg: "gray.600" }}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Navbar>
      <Container minW="60%" maxW="60%" pt="2">
        <Box p="8" bg="#ffffff" rounded="lg" boxShadow="lg">
          <Heading textAlign="center" mb="5">
            Matching
          </Heading>
          <MatchForm />
        </Box>
      </Container>
      <Container minW="60%" maxW="60%" pt="2">
        <Box p="8" bg="#ffffff" rounded="lg" boxShadow="lg">
          <Heading textAlign="center" mb="5">
            Latest Submissions
          </Heading>
          <HistoryPane />
        </Box>
      </Container>
    </BaseLayout>
  );
};

export default HomePage;
