import { useEffect, useRef, useContext } from "react";
import { eventHandles, otherFunctions } from "../../utilities/shapes.Utilities";
import { effectEventClass } from "../../myLib/effectEventClass";
import { SelectorContext } from "../whiteBoard/selectorContext";
import { CommonContext } from "../../myLib/commonContext/myContext";
import controlData from "../../utilities/controlData";



function Rectangle({ index, x, y, width, height, useAs, prevData }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);
    const { aCommunication } = useContext(CommonContext);
    const interval = useRef(null);

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef, useAs, index),
    }


    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(svgRef, 'click', bindedFunction.provideToSelector);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])
    useEffect(() => {

        interval.current = setInterval(() => {
            controlData.saveData(index, svgRef, shapeRef, aCommunication, ['width', 'height', 'left', 'top'], ['width', 'height', 'x', 'y', 'rx', 'strokeWidth', 'fill', 'stroke']);

            //console.log('the whiteboard data is : ', aCommunication.current.whiteboardData.data[index]);

        }, 1000 * 5);


        // Initailize the data of elem
        if (!aCommunication.current.whiteboardData.data[index]) {
            aCommunication.current.whiteboardData.data[index] = { index: index, style: {}, attribute: {}, shapeType: useAs };
        }
        //Remove the data of elem
        return (() => {

            if (interval.current) {
                clearInterval(interval.current);
            }
        })
    }, [])

    useEffect(() => {
        //when ever prevData we have , perform below work
        if (prevData) {

            if (svgRef.current && shapeRef.current) {

                otherFunctions.checkIfStyleParameterDoesNotExists(prevData, 'shapeElem', ['x', 'y', 'width', 'height', 'strokeWidth', 'fill', 'stroke']);
                otherFunctions.checkIfStyleParameterDoesNotExists(prevData, 'svgElem', ['top', 'left', 'width', 'height']);

                //set svg values
                svgRef.current.style.top = parseFloat(prevData.style.svgElem.top);
                svgRef.current.style.left = parseFloat(prevData.style.svgElem.left);
                svgRef.current.style.width = parseFloat(prevData.style.svgElem.width);
                svgRef.current.style.height = parseFloat(prevData.style.svgElem.height);


                //set shape values
                shapeRef.current.style.x = parseFloat(prevData.style.shapeElem.x);
                shapeRef.current.style.y = parseFloat(prevData.style.shapeElem.y);
                shapeRef.current.style.width = parseFloat(prevData.style.shapeElem.width);
                shapeRef.current.style.height = parseFloat(prevData.style.shapeElem.height);
                shapeRef.current.style.fill = prevData.style.shapeElem.fill;
                shapeRef.current.style.strokeWidth = parseFloat(prevData.style.shapeElem.strokeWidth);
                shapeRef.current.style.stroke = prevData.style.shapeElem.stroke;

            }
        }
    }, [prevData])

    if (prevData) {
        return (
            <>
                <svg ref={svgRef}
                    className="absolute " >
                    <rect ref={shapeRef} />
                </svg >
            </>
        );
    } else {

        return (
            <>
                <svg ref={svgRef} style={{
                    top: y,
                    left: x
                }}
                    width={width} height={height} className="absolute " >
                    <rect x={5} y={5} ref={shapeRef} width={width - 10} height={height - 10} fill="none" stroke="black" strokeWidth="2" />
                </svg >
            </>
        );
    }
}

function Circle({ index, x, y, cx, cy, width, height, radius, prevData }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);
    const { aCommunication } = useContext(CommonContext);
    const interval = useRef(null);

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef, 'circle', index),
    }


    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(svgRef, 'click', bindedFunction.provideToSelector);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])
    useEffect(() => {
        interval.current = setInterval(() => {
            controlData.saveData(index, svgRef, shapeRef, aCommunication, ['width', 'height', 'left', 'top'], ['r', 'cx', 'cy', 'strokeWidth', 'fill', 'stroke'],);

            // console.log('the whiteboard data is : ', aCommunication.current.whiteboardData.data[index]);

        }, 1000 * 5);

        // Initailize the data of elem
        if (!aCommunication.current.whiteboardData.data[index]) {
            aCommunication.current.whiteboardData.data[index] = { index: index, style: {}, attribute: {}, shapeType: 'circle' };
        }
        //Remove the data of elem
        return (() => {
            if (interval.current) {
                clearInterval(interval.current);
            }

        })
    }, [])
    useEffect(() => {
        //when ever prevData we have , perform below work
        if (prevData) {

            if (svgRef.current && shapeRef.current) {

                otherFunctions.checkIfStyleParameterDoesNotExists(prevData, 'shapeElem', ['cx', 'cy', 'r', 'strokeWidth', 'fill', 'stroke']);
                otherFunctions.checkIfStyleParameterDoesNotExists(prevData, 'svgElem', ['top', 'left', 'width', 'height']);

                //set svg values
                svgRef.current.style.top = parseFloat(prevData.style.svgElem.top);
                svgRef.current.style.left = parseFloat(prevData.style.svgElem.left);
                svgRef.current.style.width = parseFloat(prevData.style.svgElem.width);
                svgRef.current.style.height = parseFloat(prevData.style.svgElem.height);


                //set shape values
                shapeRef.current.style.cx = parseFloat(prevData.style.shapeElem.cx);
                shapeRef.current.style.cy = parseFloat(prevData.style.shapeElem.cy);
                shapeRef.current.style.r = parseFloat(prevData.style.shapeElem.r);
                shapeRef.current.style.fill = prevData.style.shapeElem.fill;
                shapeRef.current.style.strokeWidth = parseFloat(prevData.style.shapeElem.strokeWidth);
                shapeRef.current.style.stroke = prevData.style.shapeElem.stroke;

            }
        }
    }, [prevData])

    if (prevData) {
        return (
            <>
                <svg ref={svgRef}
                    className="absolute border border-slate-500" >
                    <circle ref={shapeRef} />
                </svg>
            </>
        );

    } else {

        return (
            <>
                <svg ref={svgRef} style={{
                    top: y,
                    left: x
                }}
                    width={width} height={height} className="absolute border border-slate-500" >
                    <circle ref={shapeRef} cx={width / 2} cy={width / 2} r={width / 2 - 5} fill="none" stroke="black" strokeWidth="2" />
                </svg>
            </>
        );
    }
}

function Triangle({ index, x, y, width, height, prevData }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);
    const { aCommunication } = useContext(CommonContext);
    const interval = useRef(null);

    /* 
    
    const thePoints = {
        p1: `${width / 2},${10 / 100 * height}`,
        p2: `${10 / 100 * width},${height - (10 / 100 * height)}`,
        p3: `${width - (10 / 100 * width)},${height - (10 / 100 * height)}`,
        
    }
    */
    const thePoints = {
        p1: `${width / 2},${5}`,
        p2: `${5},${height - 5}`,
        p3: `${width - 5},${height - 5}`,

    }

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef, 'triangle', index),
    }


    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(svgRef, 'click', bindedFunction.provideToSelector);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])
    useEffect(() => {

        interval.current = setInterval(() => {
            controlData.saveData(index, svgRef, shapeRef, aCommunication, ['width', 'height', 'left', 'top'], ['strokeWidth', 'fill', 'stroke'], [], ['points'],);

            //console.log('the whiteboard data is : ', aCommunication.current.whiteboardData.data[index]);

        }, 1000 * 5);


        // Initailize the data of elem
        if (!aCommunication.current.whiteboardData.data[index]) {
            aCommunication.current.whiteboardData.data[index] = { index: index, style: {}, attribute: {}, shapeType: 'triangle' };
        }
        //Remove the data of elem
        return (() => {
            if (interval.current) {
                clearInterval(interval.current);
            }

        })
    }, [])

    useEffect(() => {
        //when ever prevData we have , perform below work
        if (prevData) {

            if (svgRef.current && shapeRef.current) {

                otherFunctions.checkIfStyleParameterDoesNotExists(prevData, 'shapeElem', ['strokeWidth', 'fill', 'stroke']);
                otherFunctions.checkIfStyleParameterDoesNotExists(prevData, 'svgElem', ['top', 'left', 'width', 'height']);

                //set svg values
                svgRef.current.style.top = parseFloat(prevData.style.svgElem.top);
                svgRef.current.style.left = parseFloat(prevData.style.svgElem.left);
                svgRef.current.style.width = parseFloat(prevData.style.svgElem.width);
                svgRef.current.style.height = parseFloat(prevData.style.svgElem.height);


                //set shape values
                shapeRef.current.style.fill = prevData.style.shapeElem.fill;
                shapeRef.current.style.strokeWidth = parseFloat(prevData.style.shapeElem.strokeWidth);
                shapeRef.current.style.stroke = prevData.style.shapeElem.stroke;

            }
        }
    }, [prevData])


    if (prevData) {
        return (
            <>
                <svg ref={svgRef}
                    className="absolute " >
                    <polygon ref={shapeRef} points={prevData.attribute.shapeElem.points} />
                </svg >
            </>
        );
    } else {

        return (
            <>
                <svg ref={svgRef} style={{
                    top: y,
                    left: x
                }}
                    width={width} height={height} className="absolute " >
                    <polygon ref={shapeRef} points={`${thePoints.p1} ${thePoints.p2} ${thePoints.p3}`} fill="none" stroke="black" strokeWidth="2" />
                </svg >
            </>
        );
    }
}

function Ellipse({ index, x, y, width, height, prevData }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);
    const { aCommunication } = useContext(CommonContext);
    const interval = useRef(null);

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef, 'ellipse', index),
    }


    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(svgRef, 'click', bindedFunction.provideToSelector);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])
    useEffect(() => {
        interval.current = setInterval(() => {
            controlData.saveData(index, svgRef, shapeRef, aCommunication, ['width', 'height', 'left', 'top'], ['rx', 'ry', 'cx', 'cy', 'strokeWidth', 'fill', 'stroke'],);

            console.log('the whiteboard data is : ', aCommunication.current.whiteboardData.data[index]);

        }, 1000 * 5);

        // Initailize the data of elem
        if (!aCommunication.current.whiteboardData.data[index]) {
            aCommunication.current.whiteboardData.data[index] = { index: index, style: {}, attribute: {}, shapeType: 'ellipse' };
        }
        //Remove the data of elem
        return (() => {
            if (interval.current) {
                clearInterval(interval.current);
            }

        })
    }, [])
    useEffect(() => {
        //when ever prevData we have , perform below work
        if (prevData) {

            if (svgRef.current && shapeRef.current) {

                otherFunctions.checkIfStyleParameterDoesNotExists(prevData, 'shapeElem', ['cx', 'cy', 'rx', 'ry', 'strokeWidth', 'fill', 'stroke']);
                otherFunctions.checkIfStyleParameterDoesNotExists(prevData, 'svgElem', ['top', 'left', 'width', 'height']);

                //set svg values
                svgRef.current.style.top = parseFloat(prevData.style.svgElem.top);
                svgRef.current.style.left = parseFloat(prevData.style.svgElem.left);
                svgRef.current.style.width = parseFloat(prevData.style.svgElem.width);
                svgRef.current.style.height = parseFloat(prevData.style.svgElem.height);


                //set shape values
                shapeRef.current.style.cx = parseFloat(prevData.style.shapeElem.cx);
                shapeRef.current.style.cy = parseFloat(prevData.style.shapeElem.cy);
                shapeRef.current.style.rx = parseFloat(prevData.style.shapeElem.rx);
                shapeRef.current.style.ry = parseFloat(prevData.style.shapeElem.ry);
                shapeRef.current.style.fill = prevData.style.shapeElem.fill;
                shapeRef.current.style.strokeWidth = parseFloat(prevData.style.shapeElem.strokeWidth);
                shapeRef.current.style.stroke = prevData.style.shapeElem.stroke;

            }
        }
    }, [prevData])

    if (prevData) {
        return (
            <>
                <svg ref={svgRef}
                    width={width} height={height} className="absolute border border-slate-500" >
                    <ellipse ref={shapeRef} />
                </svg>
            </>
        );
    } else {

        return (
            <>
                <svg ref={svgRef} style={{
                    top: y,
                    left: x
                }}
                    width={width} height={height} className="absolute border border-slate-500" >
                    <ellipse ref={shapeRef} cx={width / 2} cy={height / 2} rx={width / 2 - 5} ry={height / 2 - 5} fill="none" stroke="black" strokeWidth="2" />
                </svg>
            </>
        );
    }
}





export { Rectangle, Circle, Triangle, Ellipse }
