import { useEffect, useRef, useContext } from "react";
import { eventHandles } from "../../utilities/shapes.Utilities";
import { effectEventClass } from "../../myLib/effectEventClass";
import { SelectorContext } from "../whiteBoard/selectorContext";



function Rectangle({ index, x, y, width, height, useAs }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef, useAs),
    }


    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(svgRef, 'click', bindedFunction.provideToSelector);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])
    return (
        <>
            <svg ref={svgRef} style={{
                top: y,
                left: x
            }}
                width={width} height={height} className="absolute " >
                <rect ref={shapeRef} width={width} height={height} fill="none" stroke="black" strokeWidth="2" />
            </svg >
        </>
    );
}

function Circle({ index, x, y, cx, cy, width, height, radius }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef, 'circle'),
    }


    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(svgRef, 'click', bindedFunction.provideToSelector);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])
    return (
        <>
            <svg ref={svgRef} style={{
                top: y,
                left: x
            }}
                width={width} height={height} className="absolute border border-slate-500" >
                <circle ref={shapeRef} cx={cx} cy={cy} r={radius} fill="none" stroke="black" strokeWidth="2" />
            </svg>
        </>
    );
}

function Triangle({ index, x, y, width, height, points }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef, 'triangle'),
    }


    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(svgRef, 'click', bindedFunction.provideToSelector);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])
    return (
        <>
            <svg ref={svgRef} style={{
                top: y,
                left: x
            }}
                width={width} height={height} className="absolute " >
                <polygon ref={shapeRef} points={points} fill="none" stroke="black" strokeWidth="2" />
            </svg >
        </>
    );
}

function Ellipse({ index, x, y, cx, cy, width, height, rx, ry }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef, 'ellipse'),
    }


    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(svgRef, 'click', bindedFunction.provideToSelector);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])
    return (
        <>
            <svg ref={svgRef} style={{
                top: y,
                left: x
            }}
                width={width} height={height} className="absolute border border-slate-500" >
                <ellipse ref={shapeRef} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="black" strokeWidth="2" />
            </svg>
        </>
    );
}





export { Rectangle, Circle, Triangle, Ellipse }
