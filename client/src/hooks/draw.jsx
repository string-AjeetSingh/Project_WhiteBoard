import { addEvent, removeEvent } from "../utilities/addRemoveEvent";
import { effectEventClass } from "../myLib/effectEventClass";
import { useRef, useState, useEffect } from "react"
import { otherFunctions, drawLogic } from "../utilities/draw.Utilities";
import { parsePath } from "react-router-dom";
import { useMouseMovement } from "./mousePointerMove";

function Canvas({ width, height, theRef, heighlight, x, y }) {

    useEffect(() => {
        if (theRef.current) {
            theRef.ready = true;
        }
    }, [])

    return (
        <>
            <canvas ref={theRef} style={{
                width: width + 'px',
                height: height + 'px',
                backgroundColor: heighlight ? 'blue' : 'gray',
                top: y ? y + 'px' : null,
                left: x ? x + 'px' : null
            }}
                width={width} height={height} className="absolute border border-amber-950 "></canvas>
        </>
    );
}



function useDraw(parentRef, setCanvas, preScale) {
    const canvasRef = useRef(null);
    const finalCanvasRef = useRef(null);
    const theLogic = useRef(null);
    const [mousePosition, mousePositionRef, normalizeScale] = useMouseMovement(preScale);


    function provideCanvas() {
        theLogic.current = new drawLogic(parentRef, canvasRef, finalCanvasRef, pushCanvas, mousePositionRef, normalizeScale);
        setCanvas((prev) => {
            let newOne = prev.slice();
            let parentProp = otherFunctions.getBoundingClientRectRespectToZoomScale(normalizeScale, parentRef);
            //newOne.push(<Canvas width={parentProp.width} height={parentProp.height} theRef={finalCanvasRef} />);
            newOne.push(<Canvas width={parentProp.width} height={parentProp.height} theRef={canvasRef} />);
            return newOne;
        })
        otherFunctions.checkAndRun(canvasRef, 'ready', true, theLogic.current.startDrawing);
    }

    function pushCanvas(theRef, x, y, width, height, heighlight) {
        setCanvas((prev) => {
            let newOne = prev.slice();
            //newOne.push(<Canvas width={parentProp.width} height={parentProp.height} theRef={finalCanvasRef} />);
            newOne.push(<Canvas x={x} y={y} width={width} height={height} heighlight={heighlight} theRef={theRef} />);
            return newOne;
        })
    }

    useEffect(() => {
        const events = new effectEventClass();

        events.setEvent(parentRef, 'mousedown', provideCanvas);

        return (() => {
            events.returnEvents();
        })
    }, []);
}





export { useDraw }