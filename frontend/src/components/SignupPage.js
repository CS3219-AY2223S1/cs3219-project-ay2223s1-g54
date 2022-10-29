import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Link,
  Container,
  CssBaseline,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC_CREATE_USER } from "../configs";
import { Link as LinkRoute } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

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
    setSuccessDialog("Account successfully created! Please check your email");

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
          height: 550,
          borderRadius: 3,
          background: "white",
          boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography
              component="h1"
              variant="h2"
              sx={{ mt: 2 }}
              textAlign="center"
            >
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
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs>
                <Link href="/resetPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
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
          {isSignupSuccess ? (
            <Button component={LinkRoute} to="/login">
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

export default SignupPage;
