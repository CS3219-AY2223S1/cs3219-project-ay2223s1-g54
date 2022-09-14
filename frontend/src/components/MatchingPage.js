import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_USER_SVC_LOGOUT_USER } from "../configs";

function MatchingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("refreshToken") == null) navigate("/login");
  });

  const handleMatch = (difficulty) => {
    localStorage.setItem("difficulty", difficulty);
    navigate("/waiting");
  };

  const handleLogout = async () => {
    localStorage.clear();
    await axios.post(URL_USER_SVC_LOGOUT_USER, {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    navigate("/login");
  };

  const handleDeleteAccount = () => {
    // Todo
    navigate("/login");
  };

  const handleUpdatePassword = () => {
    // Todo
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={"90%"}>
      <Typography variant={"h5"} align={"center"} marginBottom={"2rem"}>
        Select the Difficulty
      </Typography>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleMatch(0)}
          sx={{ width: 1 / 2 }}
        >
          Easy
        </Button>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleMatch(1)}
          sx={{ width: 1 / 2 }}
        >
          Medium
        </Button>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleMatch(2)}
          sx={{ width: 1 / 2 }}
        >
          Hard
        </Button>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleMatch(3)}
          sx={{ width: 1 / 2 }}
        >
          Any
        </Button>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleLogout()}
          sx={{ width: 1 / 2 }}
        >
          Logout
        </Button>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleDeleteAccount()}
          sx={{ width: 1 / 2 }}
        >
          Delete account
        </Button>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleUpdatePassword()}
          sx={{ width: 1 / 2 }}
        >
          Update password
        </Button>
      </Box>
    </Box>
  );
}

export default MatchingPage;
