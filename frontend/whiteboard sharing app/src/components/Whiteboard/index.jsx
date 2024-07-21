import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();
const Whiteboard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);

useEffect(() => {
  const canvas = canvasRef.current;
  if (canvas) {
    canvas.height = window.innerHeight / 1.25;
    canvas.width = window.innerWidth / 1.7;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctxRef.current = ctx;
    }
  }
}, [color]); // Ensure that color changes are applied


  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
  
    const roughCanvas = rough.canvas(canvas);
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  
    elements.forEach((element) => {
      if (!element) return;
      switch (element.type) {
        case "pencil":
          roughCanvas.linearPath(element.path, {
            stroke: element.stroke,
            strokeWidth: 5,
            roughness: 0,
          });
          break;
        case "line":
          roughCanvas.line(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0,
            }
          );
          break;
        case "rect":
          roughCanvas.draw(
            roughGenerator.rectangle(
              element.offsetX,
              element.offsetY,
              element.width,
              element.height,
              {
                stroke: element.stroke,
                strokeWidth: 5,
                roughness: 0,
              }
            )
          );
          break;
        case "circle":
          const radius = Math.sqrt(
            Math.pow(element.width, 2) + Math.pow(element.height, 2)
          );
          roughCanvas.draw(
            roughGenerator.circle(element.offsetX, element.offsetY, radius * 2, {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0,
            })
          );
          break;
        default:
          break;
      }
    });
  }, [elements]);
  

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
    } else if (tool === "circle") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "circle",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
    }
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool === "pencil") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];

        setElements((prevElements) =>
          prevElements.map((ele, index) => {
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
      } else if (tool === "line") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
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
      } else if (tool === "rect") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "circle") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <>
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
