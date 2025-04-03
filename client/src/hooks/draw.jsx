
import { effectEventClass } from "../myLib/effectEventClass";
import { useRef, useState, useEffect, useContext } from "react"
import { otherFunctions, drawLogic } from "../utilities/draw.Utilities";
import { useMouseMovement } from "./mousePointerMove";
import { CommonContext } from "../myLib/commonContext/myContext";
import controlData from "../utilities/controlData";
import { otherFunctions as shapeUtil } from "../utilities/shapes.Utilities";

function Canvas({ index, width, height, theRef, heighlight, x, y, isFinal, prevData }) {
    const { aCommunication, selectedItem } = useContext(CommonContext);
    const localRef = useRef(null);
    const interval = useRef(null);

    function startErasing() {
        if (aCommunication.current?.draw) {
            if (selectedItem.current === 'eraser') {

                aCommunication.current.draw.selectPenStyle(null, 'rgba(0, 0, 0, 1)', 3);
                aCommunication.current.draw.readyToErase(localRef);
            }
        }
    }

    useEffect(() => {

        if (theRef?.current) {
            theRef.ready = true;
            localRef.current = theRef.current;
        }
        const theEvents = new effectEventClass();

        theEvents.setEvent(localRef, 'mousedown', startErasing);

        return (() => {
            theEvents.returnEvents();
        })

    }, [])

    useEffect(() => {
        if (isFinal) {
            interval.current = setInterval(() => {
                try {
                    const imageData = localRef.current.toDataURL("image/png");
                    controlData.saveData(index, localRef, null, aCommunication, ['top', 'left', 'width', 'height']);
                    aCommunication.current.whiteboardData.data[index].style.shapeElem = {
                        imageData: imageData
                    }
                } catch (error) {
                    console.error('the error from interval of canvas : ', error);
                }
                console.log("the canvas whiteboarddata is : ", aCommunication.current.whiteboardData.data[index]);
            }, 1000 * 5);

            // Initailize the data of elem
            if (!aCommunication.current.whiteboardData.data[index]) {
                aCommunication.current.whiteboardData.data[index] = { index: index, style: {}, attribute: {}, isPenCanvas: true, penProfile: {} };
            }




        }


        return (() => {

            if (interval.current) {
                clearInterval(interval.current);
            }
        })
    }, [isFinal])


    useEffect(() => {
        if (prevData) {

            shapeUtil.checkIfStyleParameterDoesNotExists(prevData, 'svgElem', ['top', 'left', 'width', 'height']);
            localRef.current.style.width = prevData.style.svgElem.width;
            localRef.current.style.height = prevData.style.svgElem.height;
            localRef.current.style.top = prevData.style.svgElem.top;
            localRef.current.style.left = prevData.style.svgElem.left;

            const context = localRef.current.getContext('2d');
            const img = new Image();
            img.src = prevData.style.shapeElem.imageData;
            img.onload = () => {
                context.drawImage(img, 0, 0, localRef.current.width, localRef.current.height);
            }




        }
    }, [prevData])

    if (prevData) {
        return (
            <>
                <canvas ref={theRef ? theRef : localRef} width={prevData.style.svgElem.width} height={prevData.style.svgElem.height}
                    className="absolute border border-amber-950 "></canvas>
            </>
        );
    } else {

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


    function pushCanvas(theRef, x, y, width, height, heighlight, penProfile) {
        const newIndex = aCommunication.current.globalIndex.getNewIndex();
        setCanvas((prev) => {
            let newOne = prev.slice();
            //newOne.push(<Canvas width={parentProp.width} height={parentProp.height} theRef={finalCanvasRef} />);
            newOne.push(<Canvas isFinal={{ penProfile: penProfile }} index={newIndex} x={x} y={y} width={width} height={height} heighlight={heighlight} theRef={theRef} />);
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





export { useDraw, Canvas }