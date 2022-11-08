import {
  useColorMode,
  useColorModeValue,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box px="4" bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex h="16" alignItems="center" justifyContent="space-between">
        <Box>𝒫𝑒𝑒𝓇𝒫𝓇𝑒𝓅</Box>
        <Flex direction="row" alignItems="center" justifyContent="center">
          {props.children}
        </Flex>
        <Box>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
