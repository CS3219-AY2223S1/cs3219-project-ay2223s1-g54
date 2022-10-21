import { useEffect, useState } from "react";
import { Box, MenuItem, Select, Stack } from "@mui/material";
import Editor from "@monaco-editor/react";

const CollaborativeCodeEditor = (props) => {
  const [theme, setTheme] = useState("vs-light");
  const [languageMap, setLanguageMap] = useState({});
  const [languageSlug, setLanguageSlug] = useState("");
  const [code, setCode] = useState("");
  const { socket, collabData } = props;
  const { roomId, questionSet } = collabData;
  const firstQuestion = questionSet[0];
  const secondQuestion = questionSet[1];

  const languageIdMap = new Map();
  languageIdMap.set("cpp", 76);
  languageIdMap.set("java", 62);
  languageIdMap.set("python", 70);
  languageIdMap.set("python3", 71);
  languageIdMap.set("c", 75);
  languageIdMap.set("csharp", 51);
  languageIdMap.set("javascript", 63);
  languageIdMap.set("ruby", 72);
  languageIdMap.set("swift", 83);
  languageIdMap.set("golang", 60);
  languageIdMap.set("scala", 81);
  languageIdMap.set("kotlin", 78);
  languageIdMap.set("rust", 73);
  languageIdMap.set("php", 68);
  languageIdMap.set("typescript", 74);
  languageIdMap.set("erlang", 58);
  languageIdMap.set("elixir", 57);

  const initLanguageMap = (question) => {
    const { codeSnippets } = question;

    const languageMap = {};
    for (const codeSnippet of codeSnippets) {
      const { slug, name, code } = codeSnippet;
      const languageObj = {
        name,
        code,
      };
      languageMap[slug] = languageObj;
    }
    return languageMap;
  };

  const setupQuestion = (question) => {
    // initialise state if it does not exist
    if (Object.keys(languageMap).length === 0) {
      const languageMap = initLanguageMap(question);
      const firstSlug = Object.keys(languageMap)[0];
      setLanguageMap(languageMap);
      setLanguageSlug(firstSlug);
      props.setLanguageId(languageIdMap.get(firstSlug));
      setCode(languageMap[firstSlug].code);
    }
  }

  useEffect(() => {
    setupQuestion(firstQuestion);

    socket.on("receiveLanguage", ({ language }) => {
      updateCode(languageMap[language].code);
      setLanguageSlug(language);
      props.setLanguageId(languageIdMap.get(language));
    });

    socket.on("receiveCurrentCode", ({ code }) => {
      setCode(code);
      props.setCode(code);
    });

    return () => {
      socket.off("receiveLanguage");
      socket.off("receiveCurrentCode");
    };
  }, []);

  socket.on("receiveSubmitCode", () => {
    setupQuestion(questionSet[1]);
  })

  const updateTheme = (event) => {
    setTheme(event.target.value);
  };

  const updateLanguage = (event) => {
    const language = event.target.value;
    socket.emit("sendLanguage", { roomId, language });
  };

  const updateCode = (code) => {
    socket.emit("sendCurrentCode", { roomId, code });
  };

  return (
    <Stack
      height={props.hidden === true ? "100%" : "0"}
      visibility={props.hidden === true ? "none" : "hidden"}
      maxHeight="100%"
    >
      <Box marginTop="10px" marginBottom="10px" spacing="10">
        <Select
          sx={{ marginRight: "10px" }}
          value={theme}
          onChange={updateTheme}
        >
          <MenuItem key="vs-light" value="vs-light">
            Light
          </MenuItem>
          <MenuItem key="vs-dark" value="vs-dark">
            Dark
          </MenuItem>
        </Select>
        <Select value={languageSlug} onChange={updateLanguage}>
          {Object.keys(languageMap).map((slug) => {
            const language = languageMap[slug];
            return (
              <MenuItem key={slug} value={slug}>
                {language.name}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Editor
        theme={theme}
        language={languageSlug}
        value={code}
        onChange={updateCode}
      />
    </Stack>
  );
};

export { CollaborativeCodeEditor };
