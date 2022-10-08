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
    <Grid
      width="100vw"
      height="100vh"
      container
      spacing={0}
      direction="row"
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
      <Grid
        width="100%"
        height="100%"
        container
        spacing={20}
        direction="row"
        alignItems="center"
        justifyContent="center"
        padding="20px"
      >
        <Grid item xs={5}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 3,
              background: "white",
              boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Container
              component="main"
              maxWidth="xs"
              width="100%"
              height="100%"
            >
              <CssBaseline />
              <div>
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{ mt: 2 }}
                  textAlign="center"
                >
                  History
                </Typography>
              </div>
            </Container>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 3,
              background: "white",
              boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Container
              component="main"
              maxWidth="xs"
              width="100%"
              height="100%"
            >
              <CssBaseline />
              <div>
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
              </div>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainPage;
