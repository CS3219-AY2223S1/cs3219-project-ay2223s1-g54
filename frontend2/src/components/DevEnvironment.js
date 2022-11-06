import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import CodeEditor from "../components/CodeEditor";

const DevEnvironment = (props) => {
  const [codeEditorTheme, setCodeEditorTheme] = useState("vs-dark");
  const [languageMap, setLanguageMap] = useState({});
  const [languageSlug, setLanguageSlug] = useState("");
  const [code, setCode] = useState("");
  const { socket, roomId, codeSnippets } = props;

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

  useEffect(() => {
    socket.on("receiveLanguage", ({ language }) => {
      updateCode(languageMap[language].code);
      setLanguageSlug(language);
      // TODO: delete?
      // props.onSetLanguageId(languageIdMap.get(language));
    });

    socket.on("receiveCurrentCode", ({ code }) => {
      setCode(code);
      props.onSetCode(code);
    });

    initDevEnvironmentOptions();

    return () => {
      socket.off("receiveLanguage");
      socket.off("receiveCurrentCode");
    };
  });

  const initLanguageMap = () => {
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

  const initDevEnvironmentOptions = () => {
    // initialise state if it does not exist
    if (Object.keys(languageMap).length === 0) {
      const languageMap = initLanguageMap();
      const firstSlug = Object.keys(languageMap)[0];
      setLanguageMap(languageMap);
      setLanguageSlug(firstSlug);
      // TODO: delete?
      // props.onSetLanguageId(languageIdMap.get(firstSlug));
      setCode(languageMap[firstSlug].code);
    }
  };

  const updateCodeEditorTheme = (event) => {
    const theme = event.target.value;
    setCodeEditorTheme(theme);
  };

  const updateLanguage = (event) => {
    const language = event.target.value;
    socket.emit("sendLanguage", { roomId, language });
  };

  const updateCode = (code) => {
    socket.emit("sendCurrentCode", { roomId, code });
  };

  return (
    <Box w="full" minH="full" maxH="full" h="full">
      <Flex direction="column" minH="full" maxH="full" h="full">
        <Accordion allowToggle mb="2">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                IDE Options
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Flex>
                <Select
                  variant="filled"
                  mr="2"
                  value={codeEditorTheme}
                  onChange={updateCodeEditorTheme}
                >
                  <option value="light">Light</option>
                  <option value="vs-dark">Dark</option>
                </Select>
                <Select
                  variant="filled"
                  ml="2"
                  value={languageSlug}
                  onChange={updateLanguage}
                >
                  {Object.keys(languageMap).map((slug) => {
                    return (
                      <option key={slug} value={slug}>
                        {languageMap[slug].name}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Run Test
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Stack>
                <Input size="md" placeholder="Specify standard input" />
                <Textarea
                  placeholder="Program output will be shown here"
                  isReadOnly
                />
                <Button colorScheme="green">Compile Code</Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <CodeEditor
          theme={codeEditorTheme}
          language={languageSlug}
          value={code}
          onChange={updateCode}
        />
      </Flex>
    </Box>
  );
};

export default DevEnvironment;
