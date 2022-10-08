import {
  Box,
  Button,
  Typography,
  Grid,
  CssBaseline,
  Container,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import SettingsMenu from "./SettingsMenu";

function MainPage() {
  const navigate = useNavigate();

  const handleMatch = (difficulty) => {
    navigate("/waiting", { state: { difficulty } });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100vh"
      style={{ background: "#F1DDBF" }}
    >
      <Grid container spacing={0}>
        <Grid item xs={11}>
          <Typography
            variant={"h2"}
            align={"left"}
            marginTop={"2rem"}
            marginLeft={"5rem"}
            marginBottom={"2rem"}
            textAlign="center"
          >
            Hi, it is time to prepare for interview!
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <SettingsMenu />
        </Grid>
      </Grid>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="stretch"
        width="100%"
        height="100%"
        padding="40px"
      >
        <Box
          sx={{
            width: "40%",
            borderRadius: 3,
            background: "white",
            boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography
              component="h1"
              variant="h2"
              sx={{ mt: 2 }}
              textAlign="center"
            >
              History
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "40%",
            borderRadius: 3,
            background: "white",
            boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography
              component="h1"
              variant="h2"
              sx={{ mt: 2 }}
              textAlign="center"
            >
              Find Match
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => handleMatch(0)}
            >
              Easy
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => handleMatch(1)}
            >
              Medium
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => handleMatch(2)}
            >
              Hard
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => handleMatch(3)}
            >
              Random
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
