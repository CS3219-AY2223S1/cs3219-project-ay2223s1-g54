import {
  Box,
  Button,
  Container,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import MatchForm from "../MatchForm";
import Navbar from "../Navbar";
import BaseLayout from "../layouts/BaseLayout";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();
  const { username } = auth;

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
            <MenuItem>Item1</MenuItem>
            <MenuItem>Item2</MenuItem>
            <MenuDivider />
            <MenuItem>Item3</MenuItem>
          </MenuList>
        </Menu>
      </Navbar>

      <Container pt="100">
        <Box p="8" bg="#ffffff" rounded="lg" boxShadow="lg">
          <MatchForm />
        </Box>
      </Container>
    </BaseLayout>
  );
};

export default HomePage;
