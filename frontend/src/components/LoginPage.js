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
import { URL_AUTH_SVC_LOGIN_USER } from "../configs";
import { Link as LinkRoute, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post(URL_AUTH_SVC_LOGIN_USER, { email, password });
    } catch (err) {
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        setErrorDialog(name, message);
        return;
      }
      setErrorDialog("Unknown Error", "Please try again later");
      return;
    }
    navigate("/matching");
  };

  const closeDialog = () => setIsDialogOpen(false);

  const setErrorDialog = (title, msg) => {
    setIsDialogOpen(true);
    setDialogTitle(title);
    setDialogMsg(msg);
  };

  const navigateSignUp = () => {
    navigate("/signup");
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
        label="Email address"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: "2rem" }}
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
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
        sx={{ marginBottom: "1rem" }}
      >
        <Button variant={"outlined"} onClick={handleLogin}>
          Sign In
        </Button>
      </Box>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Done</Button>
        </DialogActions>
      </Dialog>
      <Link onClick={() => navigateSignUp()}>
        New to PeerPrep? Create an account
      </Link>
    </Box>
  );
}

export default LoginPage;
