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
  Grid,
  CssBaseline,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { io } from "socket.io-client";
import { URI_GATEWAY, URL_AUTH_SVC_LOGIN_USER } from "../configs";
import { useAuth } from "../hooks/useAuth";
import { usePublicAxios } from "../hooks/useAxios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const axiosPublic = usePublicAxios();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axiosPublic.post(URL_AUTH_SVC_LOGIN_USER, {
        email,
        password,
      });
      const { accessToken } = res.data;
      const { userId } = decodeToken(accessToken);
      const socket = io(URI_GATEWAY);
      setAuth({ accessToken, userId, socket });
      navigate("/matching");
    } catch (err) {
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        setErrorDialog(name, message);
        return;
      }
      setErrorDialog("Unknown Error", "Please try again later");
      return;
    }
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
          height: 400,
          borderRadius: 3,
          background: "white",
          boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h2" sx={{ mt: 2 }}>
              PeerPrep
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"New to PeerPrep? Create an account"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
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
    </Grid>
  );
}

export default LoginPage;
