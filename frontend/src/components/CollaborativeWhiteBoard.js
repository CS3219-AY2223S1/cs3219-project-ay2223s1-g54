import { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { ReactSketchCanvas } from "react-sketch-canvas";

const CollaborativeWhiteBoard = (props) => {
  const canvasRef = useRef();
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const { socket, collabData } = props;
  const { roomId } = collabData;

  useEffect(() => {
    socket.on("receiveDrawing", ({ strokeData }) => {
      canvasRef.current.loadPaths(strokeData);
    });

    socket.on("receiveUndoDrawing", () => {
      canvasRef.current.undo();
    });

    socket.on("receiveRedoDrawing", () => {
      canvasRef.current.redo();
    });

    socket.on("receiveClearDrawing", () => {
      canvasRef.current.clearCanvas();
    });

    return () => {
      socket.off("receiveDrawing");
      socket.off("receiveUndoDrawing");
      socket.off("receiveRedoDrawing");
      socket.off("receiveClearDrawing");
    };
  }, []);

  const handleStrokeWidthChange = (event) => {
    setStrokeWidth(event.target.value);
  };

  const handleStrokeColorChange = (event) => {
    setStrokeColor(event.target.value);
  };

  const handleEraserToggle = () => {
    canvasRef.current.eraseMode(!isEraser);
    setIsEraser(!isEraser);
  };

  const handleCanvasUndo = () => {
    socket.emit("sendUndoDrawing", { roomId });
  };

  const handleCanvasRedo = () => {
    socket.emit("sendRedoDrawing", { roomId });
  };

  const handleCanvasStroke = (strokeData) => {
    socket.emit("sendDrawing", { roomId, strokeData });
  };

  const handleCanvasClear = () => {
    socket.emit("sendClearDrawing", { roomId });
  };

  return (
    <Stack
      height={props.hidden === true ? "100%" : "0"}
      visibility={props.hidden === true ? "none" : "hidden"}
      maxHeight="100%"
    >
      <Box display="flex" flexDirection="row">
        <input
          type="number"
          min="1"
          max="24"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        />
        <input type="color" onChange={handleStrokeColorChange} />
        <button onClick={handleEraserToggle}>
          {isEraser ? "Pen" : "Eraser"}
        </button>
        <button onClick={handleCanvasUndo}>Undo</button>
        <button onClick={handleCanvasRedo}>Redo</button>
        <button onClick={handleCanvasClear}>Clear</button>
      </Box>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        eraserWidth={strokeWidth}
        onStroke={handleCanvasStroke}
      />
    </Stack>
  );
};

export { CollaborativeWhiteBoard };
