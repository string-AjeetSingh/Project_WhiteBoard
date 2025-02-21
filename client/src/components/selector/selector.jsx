import { useMouseMovement } from "../../hooks/mousePointerMove";
import { useContext, useRef, useState, useEffect } from "react";
import { SelectorContext } from "../whiteBoard/selectorContext";
import { selectorWork } from "../../utilities/selector.Utilities";


function Selector({ }) {
    const [mousePointer, mousePointerRef] = useMouseMovement();
    const widthRef = useRef(null);
    const heightRef = useRef(null);
    const dotRef = useRef(null);
    const selectedElem = useRef(null);
    const { theSelector, innerDiv } = useContext(SelectorContext);


    useEffect(() => {
        theSelector.current.select = (svgRef, svgElemRef) => {
            selectedElem.current = { svgRef: svgRef, svgElemRef: svgElemRef };
            console.log('the selectedElem : ', selectedElem.current);
            selectorWork.select(widthRef, heightRef, dotRef, selectedElem, innerDiv);

        };
    }, [])



    useEffect(() => {

    }, [mousePointer])

    return (
        <>
            <div ref={widthRef}
                style={{                        //width
                    left: '10px',
                    top: '10px'
                }}
                className="w-[3px] h-[200px] bg-amber-900 absolute">

            </div>
            <div ref={heightRef}
                style={{                        //height
                    left: '20px',
                    top: '10px'
                }}
                className="w-[200px] h-[3px] bg-amber-900 absolute">

            </div>
            <div ref={dotRef}
                style={{                        //dot
                    left: '20px',
                    top: '30px'
                }}
                className=" absolute size-3 rounded-full bg-amber-900">

            </div>
        </>
    );
}



export { Selector }
