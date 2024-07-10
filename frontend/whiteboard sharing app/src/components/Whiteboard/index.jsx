import { useEffect, useState } from "react";
import rough from "roughjs";
const Whiteboard = ({ canvasRef, ctxRef, Elements, setElements }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctxRef.current = ctx;
  }, []);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log("offsetX", offsetX);
    console.log("offsetY", offsetY);
    setIsDrawing(true);
  };
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      console.log("offsetX", offsetX);
      console.log("offsetY", offsetY);
    }
  };
  const handleMouseUp = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log("offsetX", offsetX);
    console.log("offsetY", offsetY);
    setIsDrawing(false);
  };

  return (
    <>
      {/* {JSON.stringify(elements)} */}
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </>
  );
};

export default Whiteboard;
