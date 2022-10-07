import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as configs from "../configs";
import { useAuth } from "../hooks/useAuth";
import { usePrivateAxios } from "../hooks/useAxios";

function MatchingPage() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const { userId, socket } = auth;
  const privateAxios = usePrivateAxios();

  useEffect(() => {
    // component mount, add event handlers
    socket.on("connect", () => {
      console.log("connected to gateway");
      socket.emit("clientConnected", { socketId: socket.id, userId });
    });

    socket.on("disconnect", () => {
      console.log("disconnected to gateway");
      socket.emit("clientDisconnected", { userId });
    });

    // component unmount, remove event handlers
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  });

  const handleMatch = (difficulty) => {
    navigate("/waiting", { state: { difficulty } });
  };

  const handleLogout = async () => {
    await privateAxios.post(configs.URL_AUTH_SVC_LOGOUT_USER);
    setAuth({});
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    await privateAxios.post(configs.URL_USER_SVC_DELETE_USER);
    setAuth({});
    navigate("/login");
  };

  const handleUpdatePassword = async () => {
    try {
      await privateAxios.post(configs.URL_USER_SVC_UPDATE_USER, {
        oldPassword,
        newPassword,
      });
      alert("Success");
    } catch (err) {
      if (err?.response?.data?.error) {
        const { name, message } = err.response.data.error;
        alert(`${name}::${message}`);
        return;
      }
      alert("Error::Please try again later");
    }
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
      <br />
      <br />
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <TextField
          label="Old Password"
          variant="standard"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          sx={{ marginBottom: "2rem" }}
          autoFocus
        />
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <TextField
          label="New Password"
          variant="standard"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ marginBottom: "2rem" }}
        />
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
