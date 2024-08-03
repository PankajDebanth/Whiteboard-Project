import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();
const Whiteboard = ({ canvasRef, ctxRef, elements, setElements, tool, color, user, socket }) => {
  const [img, setImg] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    socket.on("whiteboardDataResponse", (data) => {
      setImg(data.imgURL);
      console.log("img", img);
    });
  }, [img]);

  if (!user?.presenter) {
    return (
      <div className="canvas">
        <img src={img} alt="Real time whiteboad image shared by presenter" />
      </div>
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 900; // Match the CSS width
      canvas.height = 517; // Match the CSS height
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctxRef.current = ctx;
      }
    }
  }, [color]);

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
          roughCanvas.line(element.offsetX, element.offsetY, element.width, element.height, {
            stroke: element.stroke,
            strokeWidth: 5,
            roughness: 0,
          });
          break;
        case "rect":
          roughCanvas.draw(
            roughGenerator.rectangle(element.offsetX, element.offsetY, element.width, element.height, {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0,
            })
          );
          break;
        case "circle":
          const radius = Math.sqrt(Math.pow(element.width, 2) + Math.pow(element.height, 2));
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

    const canvasImage = canvasRef.current.toDataURL("image/png");
    socket.emit("whiteboardData", canvasImage);
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
              return { ...ele, width: offsetX - ele.offsetX, height: offsetY - ele.offsetY };
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
      <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <canvas className="canvas" ref={canvasRef} />
      </div>
    </>
  );
};

export default Whiteboard;
