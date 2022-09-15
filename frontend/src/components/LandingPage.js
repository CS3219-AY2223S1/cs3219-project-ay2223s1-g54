import { Container, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // horizontal
        justifyContent: "center", // vertical
        height: "100vh",
      }}
    >
      <Typography variant="h1">PeerPrep</Typography>
      <Typography
        variant="caption"
        align="center"
        fontSize={"24px"}
        sx={{ width: "35%", margin: "20px" }}
      >
        PeerPrep is a interview preparation platform and a peer matching system
        where students can find peers to practice whiteboard-style interview
        questions together.
      </Typography>
      <Box>
        <Button
          sx={{ marginRight: "5px" }}
          variant="outlined"
          onClick={handleSignUp}
        >
          <Typography variant="button" display="block" gutterBottom>
            Sign Up
          </Typography>
        </Button>
        <Button
          sx={{ marginLeft: "5px" }}
          variant="contained"
          onClick={handleLogin}
        >
          <Typography variant="button" display="block" gutterBottom>
            Login
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
