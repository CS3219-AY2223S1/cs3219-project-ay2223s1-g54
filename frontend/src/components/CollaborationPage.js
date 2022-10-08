import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, Select, MenuItem } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Editor from "@monaco-editor/react";
import { useAuth } from "../hooks/useAuth";
import ChatComponent from "./ChatComponent";

function CollaborationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState("");
  const [languageIndex, setLanguageIndex] = useState("");
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [languageOption, setLanguageOption] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const { auth } = useAuth();
  const { socket } = auth;
  const { roomId, difficulty, userId1, userId2, questionSet } =
    location.state.collabData;

  useEffect(() => {
    const getQuestion = async () => {
      const question = questionSet[0];
      const { codeSnippets, content } = question;

      const languages = [];
      for (const codeSnippet of codeSnippets) {
        const { slug, name, code } = codeSnippet;
        const language = {
          slug,
          name,
          code,
        };
        languages.push(language);
      }

      setProgrammingLanguages(languages);
      setLanguageIndex(languages[0].slug);
      setQuestionContent(content);
    };

    getQuestion(difficulty);
  }, []);

  const handleCancel = () => {
    navigate("/matching");
  };

  const updateCode = (newCode) => {
    setCode(newCode);
  };

  return (
    <Box display="flex" flexDirection="column" width="90%">
      <Box display="flex" flexDirection="row" width="100%">
        <div dangerouslySetInnerHTML={{ __html: questionContent }} />
        <Box display={"flex"} flexDirection="column" width="100%">
          <Box display={"flex"} flexDirection="column" width="150px">
            <Select
              value={languageIndex}
              label="Language"
              onChange={(e) => {
                for (const programmingLanguage of programmingLanguages) {
                  if (programmingLanguage.slug === e.target.value) {
                    updateCode(programmingLanguage.code);
                  }
                }
                setLanguageIndex(e.target.value);
                setLanguageOption(e.target.value);
              }}
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
              // onChange={() => {}}
            />
          </div>
        </Box>
        //<ChatComponent />
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Button
          variant={"outlined"}
          onClick={() => handleCancel()}
          startIcon={<CloseSharpIcon />}
        >
          back
        </Button>
      </Box>
    </Box>
  );
}

export default CollaborationPage;
