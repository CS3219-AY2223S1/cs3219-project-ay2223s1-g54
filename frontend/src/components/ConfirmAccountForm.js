import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { URL_USER_SVC_EMAIl_VERIFY_USER } from "../configs";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ConfirmAccountForm = (props) => {
  const [message, setMessage] = useState(
    "Your account has been successfully verified."
  );
  const { confirmationCode } = useParams();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const verifyUrl =
          URL_USER_SVC_EMAIl_VERIFY_USER + `/${confirmationCode}`;
        await axiosPublic.get(verifyUrl);
      } catch (err) {
        if (err?.response?.data?.error) {
          const { name, message } = err.response.data.error;
          setMessage(`${message}`);
          return;
        }
        setMessage("[Unknown Error] Please try again later");
        return;
      }
    };

    verifyAccount();
  }, []);

  return (
    <Stack spacing="4">
      <Stack pt="5">
        <Box align="center">
          <Text>{message}</Text>
          <Link color="blue.400" as={RouterLink} to={props.loginLink}>
            Back to Login
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ConfirmAccountForm;
