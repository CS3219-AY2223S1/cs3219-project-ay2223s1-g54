import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CssBaseline,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useState } from "react";
import { URL_USER_RESET_PASSWORD } from "../configs";
import { usePublicAxios } from "../hooks/useAxios";
import { Link as LinkRoute, useParams } from "react-router-dom";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);

  const axiosPublic = usePublicAxios();

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

  const HandleResetPassword = async () => {
    let { userId, token } = useParams();
    if (password !== confirmPassword) {
      setErrorDialog("Validation Error", "Password fields must match");
      return;
    }

    try {
      const res = await axiosPublic.post(
        URL_USER_RESET_PASSWORD + `/${userId}/${token}`,
        {
          password,
        }
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
    setSuccessDialog("Your password has been successfully changed.");
    setIsResetPasswordSuccess(true);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", background: "#F1DDBF" }}
    >
      <Box
        sx={{
          width: 500,
          height: 300,
          borderRadius: 3,
          background: "white",
          boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography
              component="h4"
              variant="h4"
              sx={{ mt: 2 }}
              textAlign="center"
            >
              Password Reset
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={HandleResetPassword}
            >
              Reset My Password
            </Button>
          </div>
        </Container>
      </Box>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {isResetPasswordSuccess ? (
            <Button component={LinkRoute} to="/">
              Log in
            </Button>
          ) : (
            <Button onClick={closeDialog}>Done</Button>
          )}
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ResetPasswordPage;
