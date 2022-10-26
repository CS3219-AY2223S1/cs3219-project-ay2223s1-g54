import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const PasswordFormControl = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <FormControl isRequired>
      <FormLabel>{props.title ? props.title : "Password"}</FormLabel>
      <InputGroup>
        <Input type={showPassword ? "text" : "password"} />
        <InputRightElement h="full">
          <Button variant="ghost" onClick={toggleShowPassword}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordFormControl;
