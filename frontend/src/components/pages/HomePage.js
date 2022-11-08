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

  const handleAccountSettings = async () => {
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
            minW="0"
            variant="link"
            rounded="full"
            cursor="pointer"
            as={Button}
          >
            {username}
          </MenuButton>
          <MenuList alignItems="center">
            <MenuItem onClick={handleAccountSettings}>
              Account Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
