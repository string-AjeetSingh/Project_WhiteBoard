import { addEvent, removeEvent } from "../utilities/addRemoveEvent";
import { effectEventClass } from "../myLib/effectEventClass";
import { useRef, useState, useEffect, useContext } from "react"
import { otherFunctions, drawLogic } from "../utilities/draw.Utilities";
import { parsePath } from "react-router-dom";
import { useMouseMovement } from "./mousePointerMove";
import { CommonContext } from "../myLib/commonContext/myContext";

function Canvas({ width, height, theRef, heighlight, x, y }) {
    const { aCommunication, selectedItem } = useContext(CommonContext);
    const localRef = useRef(null);

    function startErasing() {
        if (aCommunication.current?.draw) {
            if (selectedItem.current === 'eraser') {

                aCommunication.current.draw.selectPenStyle(null, 'rgba(0, 0, 0, 1)', 3);
                aCommunication.current.draw.readyToErase(localRef);
            }
        }
    }

    useEffect(() => {

        if (theRef.current) {
            theRef.ready = true;
            localRef.current = theRef.current;
        }
        const theEvents = new effectEventClass();

        theEvents.setEvent(localRef, 'mousedown', startErasing);

        return (() => {
            theEvents.returnEvents();
        })

    }, [])

    return (
        <>
            <canvas ref={theRef} style={{
                width: width + 'px',
                height: height + 'px',
                backgroundColor: heighlight ? 'blue' : 'transparent',
                top: y ? y + 'px' : null,
                left: x ? x + 'px' : null
            }}
                width={width} height={height} className="absolute border border-amber-950 "></canvas>
        </>
    );
}



function useDraw(parentRef, setCanvas, setRoughCanvas, preScale) {
    const canvasRef = useRef(null);
    const finalCanvasRef = useRef(null);
    const theLogic = useRef(null);
    const functionArrayProvideStateUpdate = useRef([]);
    const penStyle = useRef({ lineWidth: 3, strokeColor: 'blue', penProfileNumber: 1 });
    const [mousePosition, mousePositionRef, normalizeScale] = useMouseMovement(preScale);
    const { aCommunication } = useContext(CommonContext);


    function provideCanvas() {
        //class instance is stored for further processing. Always creates new when we use this function.
        theLogic.current = new drawLogic(parentRef, canvasRef, finalCanvasRef, pushCanvas, setRoughCanvas, mousePositionRef, normalizeScale);
        theLogic.current.selectPenStyle(penStyle.current.lineWidth, penStyle.current.strokeColor, penStyle.current.penProfileNumber);

        let parentProp = otherFunctions.getBoundingClientRectRespectToZoomScale(normalizeScale, parentRef);
        setRoughCanvas(<Canvas width={parentProp.width} height={parentProp.height} theRef={canvasRef} />)

        otherFunctions.checkAndRun(canvasRef, 'ready', true, theLogic.current.startDrawing); //start drawing if the component is ready.
    }

    function readyToErase(theRef) {
        //Get canvas ref to work with
        canvasRef.current = theRef.current;
        theLogic.current = new drawLogic(parentRef, canvasRef, null, null, null, mousePositionRef, normalizeScale);
        theLogic.current.selectPenStyle(penStyle.current.lineWidth, penStyle.current.strokeColor, penStyle.current.penProfileNumber);
        theLogic.current.startDrawing(true);
    }

    function pushCanvas(theRef, x, y, width, height, heighlight) {
        setCanvas((prev) => {
            let newOne = prev.slice();
            //newOne.push(<Canvas width={parentProp.width} height={parentProp.height} theRef={finalCanvasRef} />);
            newOne.push(<Canvas x={x} y={y} width={width} height={height} heighlight={heighlight} theRef={theRef} />);
            return newOne;
        })
    }


    function setPenStyleCallback(callback) {          //We are not using this, we can remove, its references from the code
        if (callback) {
            functionArrayProvideStateUpdate.current.push(callback);
        } else {
            console.error('please provide callback to work with setPenStyleStateUpdate');
        }
    }

    function selectPenStyle(lineWidth, strokeColor, penProfileNumber) {
        if (lineWidth) {
            if (lineWidth === 'zero') lineWidth = 0;
            penStyle.current.lineWidth = lineWidth;
        }
        if (strokeColor) penStyle.current.strokeColor = strokeColor;
        if (penProfileNumber) penStyle.current.penProfileNumber = penProfileNumber;

        if (aCommunication.current.fromLineWidthInput.setLineWidth) {
            aCommunication.current.fromLineWidthInput.setLineWidth({ lineWidth: lineWidth });
        }
    }

    function getPenStyle() {
        return { lineWidth: penStyle.current.lineWidth, strokeColor: penStyle.current.strokeColor };
    }

    useEffect(() => {
        //Provide draw api to Communication 
        if (aCommunication.current) {
            aCommunication.current.draw = {
                selectPenStyle,
                readyToErase
            }
        }

        //set run array of state function to have current value of penStyle
        if (functionArrayProvideStateUpdate.current) {
            functionArrayProvideStateUpdate.current.forEach((item) => {
                if (item) {
                    item({ ...penStyle.current });
                }
            })
        }
        const events = new effectEventClass();

        // events.setEvent(parentRef, 'mousedown', provideCanvas);

        return (() => {
            events.returnEvents();
        })
    }, []);

    return { provideCanvas, selectPenStyle, getPenStyle, setPenStyleCallback };
}





export { useDraw }