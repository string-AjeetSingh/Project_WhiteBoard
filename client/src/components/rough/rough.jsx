import { KeyFrameTry } from "./subComponents";
import { useRef, useEffect, useState } from "react";
import "../../cssAnimations/rough.css";
import { DarkModeToogle } from "../navBar/navBar.darkModeButton";
import { SubPanelContent } from "../mainContainer/mainContainer.leftSpace.subPanelContents";
import { addEvent, removeEvent } from "../../utilities/addRemoveEvent";





function Rough({ }) {
    const canvasRef = useRef(null);
    const inputRef = useRef({ x: null, y: null, xl: null, yl: null });
    function handleLineDraw() {
        if (inputRef.current.x && inputRef.current.y && inputRef.current.yl && inputRef.current.xl) {
            const context = canvasRef.current.getContext('2d');
            context.beginPath();
            context.moveTo(inputRef.current.x, inputRef.current.y);
            context.lineTo(inputRef.current.xl, inputRef.current.yl);
            context.stroke();
        } else {
            alert('please provide all co-ord first to get effect');
        }

    }

    function startDrawing(e) {

        canvasRef.context = canvasRef.current.getContext('2d');;
        canvasRef.context.beginPath();
        canvasRef.context.lineWidth = 4;
        canvasRef.context.moveTo(e.offsetX, e.offsetY);
        canvasRef.isDrawing = true;
    }

    function draw(e) {
        if (canvasRef.isDrawing) {
            canvasRef.context.lineTo(e.offsetX, e.offsetY);
            canvasRef.context.stroke();
        }
    }

    function stopDrawing(e) {
        if (canvasRef.isDrawing) {
            canvasRef.isDrawing = false;

        }
    }


    useEffect(() => {
        if (canvasRef.current) {

            addEvent(canvasRef, 'mousedown', startDrawing)
            addEvent(canvasRef, 'mousemove', draw)
            addEvent(canvasRef, 'mouseup', stopDrawing)
        }


        return (() => {
            if (canvasRef.current) {

                removeEvent(canvasRef, 'mousedown', startDrawing)
                removeEvent(canvasRef, 'mousemove', draw)
                removeEvent(canvasRef, 'mouseup', stopDrawing)
            }

        })
    }, [])
    return (
        <>

            <KeyFrameTry />
            <br></br>
            <hr></hr>
            <div className="flex flex-col justify-center items-center p-3">
            </div>
            <canvas ref={canvasRef} width={400} height={400} className="border-2 m-1 w-[400px] h-[400px]  border-amber-950 ">

            </canvas>
            <br>
            </br>
            moveTo :
            <div className="flex flex-row m-1 ">
                x:
                <input onChange={(e) => {
                    inputRef.current.x = parseFloat(e.target.value);
                }}
                    className="bg-slate-400 m-1 w-14" type="number">
                </input>
            </div>

            <div className="flex flex-row m-1">
                y:
                <input onChange={(e) => {
                    inputRef.current.y = parseFloat(e.target.value);
                }}
                    className="bg-slate-400 m-1 w-14" type="number">
                </input>
            </div>
            lineTO :
            <div className="flex flex-row m-1 ">
                x:
                <input onChange={(e) => {
                    inputRef.current.xl = parseFloat(e.target.value);
                }}
                    className="bg-slate-400 m-1 w-14" type="number">
                </input>
            </div>

            <div className="flex flex-row m-1">
                y:
                <input onChange={(e) => {
                    inputRef.current.yl = parseFloat(e.target.value);
                }}
                    className="bg-slate-400 m-1 w-14" type="number">
                </input>
            </div>


            <button className="p-2 rounded-sm bg-slate-600 active:bg-slate-400 " onClick={handleLineDraw}>
                Draw
            </button>

        </>
    );
}



export { Rough }