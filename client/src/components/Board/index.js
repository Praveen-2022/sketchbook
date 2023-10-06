import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/slice/menuSlice";

import { socket } from "@/socket";

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const shouldDraw = useRef(false);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Download button Action
    // canvas utility to save canvas structure into url
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      // convert canvas url to data url encryption
      const URL = canvas.toDataURL();
      // Dom to select "a" tag
      const anchor = document.createElement("a");
      // take url to convet into file
      anchor.href = URL;
      // download action
      anchor.download = "sketch.jpg";
      // canvas action to save captured canvas
      anchor.click();
      // implementation of UNDO && REDO
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      // reverse action
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1;
      if (
        // upverse action
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
      historyPointer.current += 1;
// store every action after mouseUp function 
      const imageData = drawHistory.current[historyPointer.current];
      // console.log(imageData);
      // store data in local storage
      context.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    const handleChangeConfig = (config) => {
      console.log("config", config);
      changeConfig(config.color, config.size);
    };
    changeConfig(color, size);
    // socket.on("changeConfig", handleChangeConfig);

    return () => {
      // socket.off("changeConfig", handleChangeConfig);
    };
  }, [color, size]);

  // before browser pain
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };
    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      // socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
      // socket.emit("drawLine", { x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = (e) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    const handleBeginPath = (path) => {
      beginPath(path.x, path.y);
    };

    const handleDrawLine = (path) => {
      drawLine(path.x, path.y);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    socket.on("connect",()=>{
      console.log("client connected");
    })

    // socket.on("beginPath", handleBeginPath);
    // socket.on("drawLine", handleDrawLine);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      // socket.off("beginPath", handleBeginPath);
      // socket.off("drawLine", handleDrawLine);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;

// import { useEffect, useLayoutEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import { MENU_ITEMS } from "@/constants";
// import { menuItemClick, actionItemClick } from "@/slice/menuSlice";

// export default function Board() {
//   const dispatch = useDispatch();
//   const canvasRef = useRef(null);
//   const shouldDraw = useRef(false);
//   const drawHistory = useRef([]);
//   const historyPointer = useRef(0);
//   const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
//   const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

//   useEffect(() => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
//       const URL = canvas.toDataURL();
//       const anchor = document.createElement("a");
//       anchor.href = URL;
//       anchor.download = "sketch.jpg";
//       anchor.click();
//     } else if (
//       actionMenuItem === MENU_ITEMS.UNDO ||
//       actionMenuItem === MENU_ITEMS.REDO
//     ) {
//       if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
//         historyPointer.current -= 1;
//       if (
//         historyPointer.current < drawHistory.current.length - 1 &&
//         actionMenuItem === MENU_ITEMS.REDO
//       )
//         historyPointer.current += 1;
//       const imageData = drawHistory.current[historyPointer.current];
//       context.putImageData(imageData, 0, 0);
//     }
//     dispatch(actionItemClick(null));
//   }, [actionMenuItem, dispatch]);

//   useEffect(() => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     const changeConfig = () => {
//       context.strokeStyle = color;
//       context.lineWidth = size;
//     };
//     changeConfig();
//   }, [color, size]);

//   // before browser pain
//   useLayoutEffect(() => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     /////////////////////////////////////////////////
//     const beginPath = (x, y) => {
//       context.beginPath();
//       context.moveTo(x, y);
//     };

//     const drawLine = (x, y) => {
//       context.lineTo(x, y);
//       context.stroke();
//     };
//     const handleMouseDown = (e) => {
//       shouldDraw.current = true;
//       beginPath(e.clientX, e.clientY);
//     };

//     const handleMouseMove = (e) => {
//       if (!shouldDraw.current) return;
//       drawLine(e.clientX, e.clientY);
//     };

//     const handleMouseUp = (e) => {
//       shouldDraw.current = false;
//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       drawHistory.current.push(imageData);
//       historyPointer.current = drawHistory.current.length - 1;
//     };

//     canvas.addEventListener("mousedown", handleMouseDown);
//     canvas.addEventListener("mousemove", handleMouseMove);
//     canvas.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       canvas.removeEventListener("mousedown", handleMouseDown);
//       canvas.removeEventListener("mousemove", handleMouseMove);
//       canvas.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);
//   // it print select value and brush size
//   // console.log(color,size)
//   return <canvas ref={canvasRef}></canvas>;
// }
