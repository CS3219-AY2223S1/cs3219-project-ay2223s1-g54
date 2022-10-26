import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const TextFormControl = (props) => {
  return (
    <FormControl isRequired>
      <FormLabel>{props.title ? props.title : "Text"}</FormLabel>
      <Input type="text" />
    </FormControl>
  );
};

export default TextFormControl;
