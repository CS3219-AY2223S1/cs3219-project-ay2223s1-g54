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
import { URL_JUDGE_SVC_SUBMISSION } from "../configs";
import CodeEditor from "../components/CodeEditor";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const DevEnvironment = (props) => {
  const [codeEditorTheme, setCodeEditorTheme] = useState("vs-dark");
  const [languageMap, setLanguageMap] = useState({});
  const [languageSlug, setLanguageSlug] = useState("");
  const [languageId, setLanguageId] = useState(null);
  const [programInput, setProgramInput] = useState("");
  const [programOutput, setProgramOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [code, setCode] = useState("");
  const axiosPrivate = useAxiosPrivate();
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
      setLanguageId(languageIdMap.get(language));
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
  }, []);

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
      setLanguageId(languageIdMap.get(firstSlug));
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

  const handleProgramInput = (event) => {
    setProgramInput(event.target.value);
  };

  const updateProgramOutput = (compilationResult) => {
    const statusId = compilationResult?.status?.id;

    if (statusId === 3) {
      setProgramOutput(compilationResult?.stdout || "No output (status: 3)");
    } else if (statusId === 5) {
      setProgramOutput("Time Limit Exceeded" || "No output (status: 5)");
    } else if (statusId === 6) {
      // compilation error
      setProgramOutput(
        compilationResult?.compile_output || "No output (status: 6)"
      );
    } else {
      setProgramOutput(compilationResult?.stderr || "No output (all)");
    }
    setIsCompiling(false);
  };

  const handleCodeCompilation = async () => {
    setIsCompiling(true);

    const payload = {
      language_id: languageId,
      source_code: code,
      stdin: programInput,
    };

    const requestData = {
      method: "POST",
      url: URL_JUDGE_SVC_SUBMISSION,
      params: { base64_encoded: "false", fields: "*" },
      headers: { "Content-Type": "application/json" },
      data: payload,
    };

    try {
      const response = await axiosPrivate.request(requestData);
      const token = response.data.token;
      getCompilationResults(token);
    } catch (err) {
      let error = err.response ? err.response.data : err;
      // get error status
      let status = err.response.status;
      console.log("status", status);
      if (status === 429) {
        console.log("too many requests", status);
      }
      console.log("catch block...", error);
    }

    // // swap
    // // socket.emit("sendSubmitCode", { roomId });
    // setIsCompiling(false);
  };

  const getCompilationResults = async (token) => {
    const requestData = {
      method: "GET",
      url: `${URL_JUDGE_SVC_SUBMISSION}/${token}`,
      params: { base64_encoded: "false", fields: "*" },
    };

    try {
      const response = await axiosPrivate.request(requestData);
      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => getCompilationResults(token), 2000);
        return;
      }
      updateProgramOutput(response.data);
    } catch (err) {
      console.log("err", err);
    }
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
                Code Compilation
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Stack>
                <Input
                  size="md"
                  placeholder="Specify standard input"
                  onChange={handleProgramInput}
                />
                <Textarea
                  placeholder="Program output will be shown here"
                  value={programOutput}
                  isReadOnly
                />
                <Button
                  colorScheme="green"
                  isLoading={isCompiling}
                  loadingText="Compiling"
                  onClick={handleCodeCompilation}
                >
                  Compile Code
                </Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <CodeEditor
          theme={codeEditorTheme}
          language={languageSlug}
          value={code}
          onChange={updateCode}
          saveViewState
        />
      </Flex>
    </Box>
  );
};

export default DevEnvironment;
