import { Container, Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import landingPageImage from "../landingpage.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", background: "#F1DDBF" }}
    >
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // horizontal
            justifyContent: "center", // vertical
            height: "100vh",
          }}
        >
          <Typography variant="h1" fontWeight="bold" color="black">
            PeerPrep
          </Typography>
          <Typography
            variant="caption"
            align="center"
            fontSize={"24px"}
            sx={{ width: "35%", margin: "20px" }}
          >
            PeerPrep is an interview preparation platform and a peer matching
            system where students can find peers to practice whiteboard-style
            interview questions together.
          </Typography>
          <Box>
            <Button
              sx={{ marginRight: "5px" }}
              variant="outlined"
              onClick={handleSignUp}
              size="large"
            >
              <Typography variant="button" display="block" gutterBottom>
                Sign Up
              </Typography>
            </Button>
            <Button
              sx={{ marginLeft: "5px" }}
              variant="contained"
              onClick={handleLogin}
              size="large"
            >
              <Typography variant="button" display="block" gutterBottom>
                Login
              </Typography>
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <img src={landingPageImage} alt="horse" />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
