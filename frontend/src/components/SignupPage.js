import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC_CREATE_USER } from "../configs";
import { Link as LinkRoute, useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsSignupSuccess(false);

    if (password !== confirmPassword) {
      setErrorDialog("Validation Error", "Password fields must match");
      return;
    }

    try {
      await axios.post(URL_USER_SVC_CREATE_USER, {
        email,
        username,
        password,
      });
    } catch (err) {
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        setErrorDialog(name, message);
        return;
      }
      setErrorDialog("Unknown Error", "Please try again later");
      return;
    }
    setSuccessDialog("Account successfully created");

    setIsSignupSuccess(true);
  };

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

  const navigateLogIn = () => {
    navigate("/login");
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      alignItems="center"
    >
      <Typography variant={"h1"} marginBottom={"2rem"}>
        PeerPrep
      </Typography>
      <TextField
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: "1rem" }}
        autoFocus
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "2rem" }}
      />
      <TextField
        label="Confirm password"
        variant="standard"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ marginBottom: "2rem" }}
      />
      <TextField
        label="Email address"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: "2rem" }}
        autoFocus
      />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
        sx={{ marginBottom: "1rem" }}
      >
        <Button variant={"outlined"} onClick={handleSignup}>
          Sign up
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {isSignupSuccess ? (
            <Button component={LinkRoute} to="/login">
              Log in
            </Button>
          ) : (
            <Button onClick={closeDialog}>Done</Button>
          )}
        </DialogActions>
      </Dialog>
      <Link onClick={() => navigateLogIn()}>Have an account? Sign In</Link>
    </Box>
  );
}

export default SignupPage;
