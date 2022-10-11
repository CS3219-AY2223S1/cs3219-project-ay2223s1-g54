import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { CollaborativeTabs } from "./CollaborativeTabs";

function CollaborationPage() {
  const location = useLocation();
  const { auth } = useAuth();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const { socket } = auth;
  const collabData = location.state.collabData;

  useEffect(() => {
    const setupStates = async () => {
      const question = collabData.questionSet[0];
      const { title, difficulty, codeSnippets, content } = question;

      setQuestionTitle(title);
      setQuestionDifficulty(difficulty);
      setQuestionContent(content);
    };

    setupStates();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100vh"
      maxHeight="100vh"
      padding="20px"
      style={{ background: "#F1DDBF" }}
    >
      <Box display="flex" flexDirection="row" height="100%" maxHeight="100%">
        <Box
          display="flex"
          flexDirection="column"
          width="50%"
          height="100%"
          style={{ background: "white" }}
        >
          <div style={{ border: "1px solid black" }}>
            <Typography variant="button">
              Question Title: <strong>{questionTitle}</strong>
            </Typography>
            <br />
            <Typography variant="button">
              Difficulty: <strong>{questionDifficulty}</strong>
            </Typography>
          </div>

          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "scroll",
              padding: "20px",
              border: "1px solid black",
            }}
            dangerouslySetInnerHTML={{ __html: questionContent }}
          />
        </Box>

        <Divider variant="middle" />

        <CollaborativeTabs socket={socket} collabData={collabData} />
      </Box>
    </Box>
  );
}

export default CollaborationPage;
