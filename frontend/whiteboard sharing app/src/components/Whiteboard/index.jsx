import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();
const Whiteboard = ({ canvasRef, ctxRef, elements, setElements }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(()=>{
    const roughCanvas = rough.canvas(canvasRef.current);
    elements.forEach((element)=>{
      roughCanvas.linearPath(element.path);
    })
  }, [elements])

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setElements((prevELements)=>[
      ...prevELements,
      {
        type: 'pencil',
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        storke: 'black',
      }
    ])
    setIsDrawing(true);
  };
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      const { path } = elements[elements.length - 1];
      const newPath = [...path, [offsetX, offsetY]];
      setElements((prevELements)=>
        prevELements.map((ele, index)=>{
          if(index === elements.length - 1){
            return {
              ...ele,
              path: newPath,
            };
          } else {
            return ele;
          }
        })
      )
      // console.log("after", elements);
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
