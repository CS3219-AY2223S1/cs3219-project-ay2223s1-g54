import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from "@chakra-ui/react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const WhiteBoard = ({ socket, roomId }) => {
  const canvasRef = useRef();
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);

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

  const handleStrokeWidthChange = (width) => {
    setStrokeWidth(width);
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
    <Stack h="full" minH="full" maxH="full">
      <Flex>
        <NumberInput
          mr="2"
          min="1"
          max="24"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Input type="color" mr="2" onChange={handleStrokeColorChange} />
        <Button mr="2" colorScheme="teal" onClick={handleEraserToggle}>
          {isEraser ? "Pen" : "Eraser"}
        </Button>
        <Button mr="2" colorScheme="teal" onClick={handleCanvasUndo}>
          Undo
        </Button>
        <Button mr="2" colorScheme="teal" onClick={handleCanvasRedo}>
          Redo
        </Button>
        <Button colorScheme="teal" onClick={handleCanvasClear}>
          Clear
        </Button>
      </Flex>
      <Box h="full" minH="full" maxH="full" pb="137">
        <ReactSketchCanvas
          ref={canvasRef}
          height="100%"
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          eraserWidth={strokeWidth}
          onStroke={handleCanvasStroke}
        />
      </Box>
    </Stack>
  );
};

export default WhiteBoard;
