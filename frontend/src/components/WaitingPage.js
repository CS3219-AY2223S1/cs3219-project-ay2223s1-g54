import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function WaitingPage() {
  const location = useLocation();
  const { auth } = useAuth();
  const { userId, username, socket } = auth;

  useEffect(() => {
    socket.on("readyForCollab", (collabData) => {
      navigate("/collaboration", { state: { collabData } });
    });

    socket.emit("findMatch", {
      difficulty: location.state.difficulty,
      userId,
      username,
    });
  });

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/matching");
  };

  const handleFailureMatch = () => {
    navigate("/matching");
  };

  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div
          className="text"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Remaining
        </div>
        <div
          className="value"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {remainingTime}
        </div>
        <div
          className="text"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          seconds
        </div>
      </div>
    );
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={"90%"}>
      <Typography variant={"h6"} align={"center"} marginBottom={"2rem"}>
        Looking for Match
      </Typography>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <CountdownCircleTimer
          isPlaying
          duration={30}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[30, 20, 10, 0]}
          onComplete={() => handleFailureMatch()}
        >
          {renderTime}
        </CountdownCircleTimer>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button variant={"outlined"} onClick={() => handleCancel()}>
          back
        </Button>
      </Box>
    </Box>
  );
}

export default WaitingPage;
