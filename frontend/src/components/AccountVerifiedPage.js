import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useEffect, useState } from "react";
import { URL_USER_SVC_EMAIl_VERIFY_USER } from "../configs";
import { usePublicAxios } from "../hooks/useAxios";
import { Link as LinkRoute, useNavigate, useParams } from "react-router-dom";

function AccountVerifiedPage() {
  const navigate = useNavigate();
  const { confirmationCode } = useParams();
  const axiosPublic = usePublicAxios();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [isNewAccountVerified, setIsNewAccountVerified] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle("Success");
    setDialogMsg(msg);
  };

  const setErrorDialog = (title, msg) => {
    setIsDialogOpen(true);
    setDialogTitle(title);
    setDialogMsg(msg);
  };

  const handleVerifyEmailAccount = async () => {
    try {
      await axiosPublic.get(
        URL_USER_SVC_EMAIl_VERIFY_USER + `/${confirmationCode}`
      );
    } catch (err) {
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        setErrorDialog(name, message);
        return;
      }

      setErrorDialog("Unknown Error", "Please try again later");
      return;
    }

    setSuccessDialog(
      "Your account has been verified. You will automatically redirected to login page."
    );
    setIsNewAccountVerified(true);
  };

  useEffect(() => {
    handleVerifyEmailAccount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }, []);

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMsg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {isNewAccountVerified ? (
          <Button component={LinkRoute} to="/login">
            Log in
          </Button>
        ) : (
          <Button onClick={closeDialog}>Done</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default AccountVerifiedPage;
