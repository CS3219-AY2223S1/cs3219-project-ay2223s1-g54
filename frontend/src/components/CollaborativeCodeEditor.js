import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, MenuItem, Select } from "@mui/material";

const CollaborativeCodeEditor = (props) => {
  const [code, setCode] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [languageSlug, setLanguageSlug] = useState("");
  const { socket, collabData } = props;
  const { roomId, questionSet } = collabData;

  const updateLanguage = (event) => {
    const language = event.target.value;
    socket.emit("sendLanguage", { roomId, language });
  };

  const updateCode = (code) => {
    socket.emit("sendCurrentCode", { roomId, code });
  };

  useEffect(() => {
    const question = questionSet[0];
    const { codeSnippets } = question;

    let languages = [];
    for (const codeSnippet of codeSnippets) {
      const { slug, name, code } = codeSnippet;
      const language = {
        slug,
        name,
        code,
      };
      languages.push(language);
    }

    setLanguageList(languages);
    setLanguageSlug(languages[0].slug);
    setCode(languages[0].code);

    socket.on("receiveLanguage", ({ language }) => {
      console.log(languageList);
      for (const languageItem of languageList) {
        if (languageItem.slug === language) {
          updateCode(languageItem.code);
        }
      }
      setLanguageSlug(language);
    });

    socket.on("receiveCurrentCode", ({ code }) => {
      setCode(code);
    });

    return () => {
      socket.off("receiveLanguage");
      socket.off("receiveCurrentCode");
    };
  }, []);

  return (
    <div>
      <Box display={"flex"} flexDirection="column">
        <div style={{ marginBottom: "10px" }}>
          <Select value={languageSlug} onChange={updateLanguage}>
            {languageList.map((languageItem) => {
              return (
                <MenuItem key={languageItem.slug} value={languageItem.slug}>
                  {languageItem.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <Editor
          height="70vh"
          value={code}
          language={languageSlug}
          onChange={updateCode}
        />
      </Box>
    </div>
  );
};

export { CollaborativeCodeEditor };
