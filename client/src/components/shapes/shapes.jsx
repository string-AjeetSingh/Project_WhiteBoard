import { useEffect, useRef, useContext } from "react";
import { eventHandles } from "../../utilities/shapes.Utilities";
import { effectEventClass } from "../../myLib/effectEventClass";
import { SelectorContext } from "../whiteBoard/selectorContext";
import { th } from "framer-motion/client";


function Rectangle({ index, x, y, width, height }) {

    const svgRef = useRef(null);
    const shapeRef = useRef(null);
    const { theSelector } = useContext(SelectorContext);

    const bindedFunction = {
        provideToSelector: eventHandles.useSelector.bind(null, theSelector, svgRef, shapeRef),
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
                width={width} height={height} className="absolute" >
                <rect ref={shapeRef} width={width} height={height} fill="none" stroke="black" strokeWidth="2" />
            </svg>
        </>
    );
}





export { Rectangle }
