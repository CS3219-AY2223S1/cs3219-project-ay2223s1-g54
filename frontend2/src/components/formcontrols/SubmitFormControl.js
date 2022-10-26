import { Button } from "@chakra-ui/react";

const SubmitFormControl = (props) => {
  return (
    <Button
      size="lg"
      color="white"
      bg="green.400"
      _hover={{
        bg: "green.500",
      }}
    >
      {props.title}
    </Button>
  );
};

export default SubmitFormControl;
