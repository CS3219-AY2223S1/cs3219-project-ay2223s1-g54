import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const EmailFormControl = (props) => {
  return (
    <FormControl isRequired>
      <FormLabel>{props.title ? props.title : "Email Address"}</FormLabel>
      <Input type="email" />
    </FormControl>
  );
};

export default EmailFormControl;
