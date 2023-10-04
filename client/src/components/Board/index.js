import { useRef,useEffect } from "react"


export default function Board() {
  const canvasRef =useRef(null);

  useEffect(()=>{
    if(!canvasRef.current) return;
    const canvas =canvasRef.current;
    const context=canvas.getContext('2d');

    // while mounting canvas it take display width
    canvas.width =window.innerWidth;
    canvas.height =window.innerHeight;
  },[]);

  return (
    <div>Board</div>
  )
}
