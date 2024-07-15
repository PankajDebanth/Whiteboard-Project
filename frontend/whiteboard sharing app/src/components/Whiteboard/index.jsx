import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();
const Whiteboard = ({ canvasRef, ctxRef, elements, setElements, tool }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight / 1.25;
    canvas.width = window.innerWidth / 1.7;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    elements.forEach((element) => {
      if (element.type == "pencil") {
        roughCanvas.linearPath(element.path);
      } else if (element.typr == "line") {
        roughGenerator.draw(
          roughGenerator.line(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
          )
        );
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (tool == "pencil") {
      setElements((prevELements) => [
        ...prevELements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          storke: "black",
        },
      ]);
    } else if (tool == "line") {
      setElements((prevELements) => [
        ...prevELements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          storke: "black",
        },
      ]);
    }
    setIsDrawing(true);
  };
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool == "pencil") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];

        setElements((prevELements) =>
          prevELements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool == "line") {
        setElements((prevELements) =>
          prevELements.map((ele, index) => {
            if (index == elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
    }
  };
  const handleMouseUp = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    // console.log("offsetX", offsetX);
    // console.log("offsetY", offsetY);
    setIsDrawing(false);
  };

  return (
    <>
      {/* {JSON.stringify(elements)} */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas className="canvas" ref={canvasRef} />
      </div>
      
    </>
  );
};

export default Whiteboard;
