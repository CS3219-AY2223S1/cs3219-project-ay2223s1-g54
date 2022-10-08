import { Box, Button, Typography, Grid, styled } from "@mui/material";
import { blue, teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import landingPageImage from "../img/landingpage.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const SignUpColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    "&:hover": {
      backgroundColor: teal[700],
    },
  }));

  const LoginColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  }));

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
            fontSize="1.1vw"
            sx={{ width: "35%", margin: "20px" }}
            justify="flex-end"
          >
            PeerPrep is the best interview preparation platform and a peer
            matching system where everyone such as yourself can find peers to
            practice whiteboard-style interview coding questions together. Sign
            up now to expand your algorithm knowledge and prepare for technical
            interviews.
          </Typography>
          <Box>
            <SignUpColorButton
              sx={{ marginRight: "5px" }}
              variant="outlined"
              onClick={handleSignUp}
              size="large"
            >
              <Typography variant="button" display="block" gutterBottom>
                Sign Up
              </Typography>
            </SignUpColorButton>
            <LoginColorButton
              sx={{ marginLeft: "5px" }}
              variant="contained"
              onClick={handleLogin}
              size="large"
            >
              <Typography variant="button" display="block" gutterBottom>
                Login
              </Typography>
            </LoginColorButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <img src={landingPageImage} alt="horse" />
        {/* Image credits: */}
        {/* <a href="http://www.freepik.com">Designed by Freepik</a> */}
      </Grid>
    </Grid>
  );
};

export default LandingPage;
