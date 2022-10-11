import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  CssBaseline,
  Container,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import SettingsMenu from "./SettingsMenu";

function MainPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { username } = auth;

  const handleMatch = (difficulty) => {
    navigate("/waiting", { state: { difficulty } });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      style={{ minHeight: "100vh", background: "#F1DDBF" }}
    >
      <Grid container spacing={0}>
        <Grid item xs={10}>
          <Typography
            variant={"h2"}
            align={"left"}
            marginTop={"2rem"}
            marginLeft={"2rem"}
          >
            Welcome, {username}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <SettingsMenu />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Box
            sx={{
              width: 500,
              height: 350,
              borderRadius: 3,
              background: "white",
              boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
              alignItems: "center",
              justifyContent: "center",
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
