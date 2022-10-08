import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Select, MenuItem, Typography } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useAuth } from "../hooks/useAuth";

function CollaborationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [code, setCode] = useState("");
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [languageOption, setLanguageOption] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const { auth } = useAuth();
  const { socket } = auth;
  const { roomId, difficulty, userId1, userId2, questionSet } =
    location.state.collabData;

  const updateLanguage = (event) => {
    socket.emit("sendLanguage", { roomId, language: event.target.value });
  };

  const updateCode = (code) => {
    socket.emit("sendCurrentCode", { roomId, code });
  };

  const leaveRoom = () => {
    socket.emit("sendLeaveRoom", { roomId });
  };

  useEffect(() => {
    const setupStates = async () => {
      const question = questionSet[0];
      const { title, difficulty, codeSnippets, content } = question;

      let programmingLanguages = [];
      for (const codeSnippet of codeSnippets) {
        const { slug, name, code } = codeSnippet;
        const programmingLanguage = {
          slug,
          name,
          code,
        };
        programmingLanguages.push(programmingLanguage);
      }

      setProgrammingLanguages(programmingLanguages);
      setQuestionTitle(title);
      setQuestionDifficulty(difficulty);
      setLanguageOption(programmingLanguages[0].slug);
      setCode(programmingLanguages[0].code);
      setQuestionContent(content);

      socket.on("receiveLanguage", ({ language }) => {
        for (const programmingLanguage of programmingLanguages) {
          if (programmingLanguage.slug === language) {
            updateCode(programmingLanguage.code);
          }
        }
        setLanguageOption(language);
      });

      socket.on("receiveCurrentCode", ({ code }) => {
        setCode(code);
      });

      socket.on("receiveLeaveRoom", () => {
        alert("This session will be closing");
        navigate("/matching");
      });
    };

    setupStates(difficulty);

    return () => {
      socket.off("receiveLanguage");
      socket.off("receiveCurrentCode");
      socket.off("receiveLeaveRoom");
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" width="90%">
      <Box display="flex" flexDirection="row" width="100%">
        <Box display="flex" flexDirection="column" width="100%">
          <Box display="flex" flexDirection="row" width="100%">
            <Typography variant="button" margin="20px">
              Question Title: <strong>{questionTitle}</strong>
            </Typography>
            <Typography variant="button" margin="20px">
              Difficulty: <strong>{questionDifficulty}</strong>
            </Typography>
          </Box>
          <div dangerouslySetInnerHTML={{ __html: questionContent }} />
        </Box>
        <Box display={"flex"} flexDirection="column" width="100%">
          <Box display={"flex"} flexDirection="column" width="150px">
            <Select
              value={languageOption}
              label="Language"
              onChange={updateLanguage}
            >
              {programmingLanguages.map((programmingLanguage) => {
                return (
                  <MenuItem
                    key={programmingLanguage.slug}
                    value={programmingLanguage.slug}
                  >
                    {programmingLanguage.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <div>
            <Editor
              height="80vh"
              value={code}
              language={languageOption}
              onChange={updateCode}
            />
          </div>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={(e) => leaveRoom()}
          startIcon={<CloseSharpIcon />}
        >
          back
        </Button>
      </Box>
    </Box>
  );
}

export default CollaborationPage;
