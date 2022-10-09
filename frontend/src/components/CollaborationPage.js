import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useAuth } from "../hooks/useAuth";
import ChatComponent from "./ChatComponent";

function CollaborationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [code, setCode] = useState("");
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [languageOption, setLanguageOption] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [tabIndex, setTabIndex] = useState("0");
  const { auth } = useAuth();
  const { socket } = auth;
  const { roomId, difficulty, userId1, userId2, questionSet } =
    location.state.collabData;
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const drawColorRef = useRef("black");
  const drawXRef = useRef(null);
  const drawYRef = useRef(null);

  const drawLine = (x0, y0, x1, y1, color, emit) => {
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    if (color === "white") {
      context.lineWidth = 20;
    } else {
      context.lineWidth = 2;
    }
    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;

    socket.emit("sendDrawing", {
      roomId,
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color,
    });
  };

  const handleMouseDown = (e) => {
    drawingRef.current = true;
    drawXRef.current = e.clientX || e.touches[0].clientX;
    drawYRef.current = e.clientY || e.touches[0].clientY;
  };

  const handleMouseUp = (e) => {
    if (!drawingRef.current) {
      return;
    }
    drawingRef.current = false;
    drawLine(
      drawXRef.current,
      drawYRef.current,
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      drawColorRef.current,
      true
    );
  };

  const handleMouseMove = (e) => {
    if (!drawingRef.current) {
      return;
    }
    drawLine(
      drawXRef.current,
      drawYRef.current,
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY,
      drawColorRef.current,
      true
    );
    drawXRef.current = e.clientX || e.touches[0].clientX;
    drawYRef.current = e.clientY || e.touches[0].clientY;
  };

  const throttle = (callback, delay) => {
    var previousCall = new Date().getTime();
    return function () {
      var time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  };

  const canvasClear = () => {
    socket.emit("sendClearDrawing", { roomId });
  };

  const onCanvasResize = (canvasRef) => {
    canvasRef.current.width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    canvasRef.current.height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  };

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

      socket.on("receiveDrawing", ({ x0, y0, x1, y1, color }) => {
        const w = canvasRef.current.width;
        const h = canvasRef.current.height;

        drawLine(x0 * w, y0 * h, x1 * w, y1 * h, color, false);
      });

      socket.on("receiveClearDrawing", () => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      });

      socket.on("receiveLeaveRoom", () => {
        alert("This session will be closing");
        navigate("/matching");
      });
    };

    setupStates();

    return () => {
      socket.off("receiveLanguage");
      socket.off("receiveCurrentCode");
      socket.off("receiveLeaveRoom");
    };
  }, []);

  const handleTabIndexChange = (event, tabIndex) => {
    setTabIndex(tabIndex);
  };

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
          <Tabs
            value={tabIndex}
            onChange={handleTabIndexChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab value="0" label="Code Editor" />
            <Tab value="1" label="White Board" />
          </Tabs>
          {tabIndex === "0" && (
            <div>
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
            </div>
          )}
          {tabIndex === "1" && (
            <div>
              <canvas
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                }}
                ref={(el) => {
                  canvasRef.current = el;
                  window.addEventListener("resize", (canvasRef) =>
                    onCanvasResize(canvasRef)
                  );
                  onCanvasResize(canvasRef);
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseUp}
                onMouseMove={throttle(handleMouseMove, 10)}
              ></canvas>

              <div style={{ position: "fixed" }}>
                <div
                  onClick={() => (drawColorRef.current = "black")}
                  style={{
                    display: "inline-block",
                    height: "48px",
                    width: "48px",
                    backgroundColor: "black",
                  }}
                >
                  Black
                </div>
                <div
                  onClick={() => (drawColorRef.current = "red")}
                  style={{
                    display: "inline-block",
                    height: "48px",
                    width: "48px",
                    backgroundColor: "red",
                  }}
                >
                  Red
                </div>
                <div
                  onClick={() => (drawColorRef.current = "green")}
                  style={{
                    display: "inline-block",
                    height: "48px",
                    width: "48px",
                    backgroundColor: "green",
                  }}
                >
                  Green
                </div>
                <div
                  onClick={() => (drawColorRef.current = "blue")}
                  style={{
                    display: "inline-block",
                    height: "48px",
                    width: "48px",
                    backgroundColor: "blue",
                  }}
                >
                  Blue
                </div>
                <div
                  onClick={() => (drawColorRef.current = "yellow")}
                  style={{
                    display: "inline-block",
                    height: "48px",
                    width: "48px",
                    backgroundColor: "yellow",
                  }}
                >
                  Yellow
                </div>
                <div
                  onClick={() => (drawColorRef.current = "white")}
                  style={{
                    display: "inline-block",
                    height: "48px",
                    width: "48px",
                    backgroundColor: "grey",
                  }}
                >
                  Erase
                </div>
                <div
                  onClick={() => canvasClear()}
                  style={{
                    display: "inline-block",
                    height: "48px",
                    width: "48px",
                    backgroundColor: "grey",
                  }}
                >
                  Clear
                </div>
              </div>
            </div>
          )}
        </Box>
        <ChatComponent />
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
