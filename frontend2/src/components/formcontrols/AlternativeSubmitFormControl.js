import { Link as RouterLink } from "react-router-dom";
import { Link, Text } from "@chakra-ui/react";

const AlternativeSubmitFormControl = (props) => {
  return (
    <Text align="center">
      {props.caption + " "}
      <Link color="blue.400" as={RouterLink} to={props.link}>
        {props.title}
      </Link>
    </Text>
  );
};

export default AlternativeSubmitFormControl;
