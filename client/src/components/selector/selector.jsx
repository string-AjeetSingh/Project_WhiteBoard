import { useMouseMovement } from "../../hooks/mousePointerMove";
import { useContext, useRef, useState, useEffect } from "react";
import { SelectorContext } from "../whiteBoard/selectorContext";
import { selectorWork, otherFunctions, bindedToUseInThisModule } from "../../utilities/selector.Utilities";
import { effectEventClass } from "../../myLib/effectEventClass";
import { CommonContext } from '../../myLib/commonContext/myContext';


function Selector({ }) {
    const widthRef = useRef(null);
    const heightRef = useRef(null);
    const dotRef = useRef(null);
    const moveRef = useRef(null);
    const selectedElem = useRef(null);
    const boolActiveIncrement = useRef(null);
    const { theSelector, innerDiv, prevScale } = useContext(SelectorContext);
    const { eventDetail, trackEvent } = useContext(CommonContext);
    const [mousePointer, mousePointerRef, normalizeScale] = useMouseMovement(prevScale);



    const bindedFunction = {
        activeWidthIncrement: selectorWork.activeIncrement.bind(null, selectedElem, innerDiv, widthRef, boolActiveIncrement, 'width'),
        activeHeightIncrement: selectorWork.activeIncrement.bind(null, selectedElem, innerDiv, heightRef, boolActiveIncrement, 'height'),
        activeMovement: selectorWork.activeMovement.bind(null, selectedElem, innerDiv, moveRef, mousePointerRef, boolActiveIncrement),
        activeDotIncrement: selectorWork.activeDotIncrement.bind(null, selectedElem, innerDiv, dotRef, mousePointerRef, boolActiveIncrement),
        deActivateIncrement: selectorWork.deActivateIncrement.bind(null, boolActiveIncrement),
        boundingDataRespectToZoom: otherFunctions.getBoundingClientRectRespectToZoomScale.bind(null, normalizeScale),
        trackWidthRefDownEvent: trackEvent.bind(null, 'widthRef', 'mousedown', null),
        trackHeightRefDownEvent: trackEvent.bind(null, 'heightRef', 'mousedown', null),
        trackDotRefDownEvent: trackEvent.bind(null, 'dotRef', 'mousedown', null),
        trackMoveRefDownEvent: trackEvent.bind(null, 'moveRef', 'mousedown', null),
    }

    useEffect(() => {
        theSelector.current.select = (svgRef, svgElemRef, type) => {
            selectedElem.current = { svgRef: svgRef, svgElemRef: svgElemRef };
            selectedElem.type = type;
            console.log('the selectedElem : ', selectedElem);
            selectorWork.select(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv);

        };

        bindedToUseInThisModule.boundingDataRespectToZoom = bindedFunction.boundingDataRespectToZoom;

    }, [])


    useEffect(() => {

        if (eventDetail.name === 'innerDiv' && eventDetail.type === 'mouseup') {
            selectorWork.deActivateIncrement(boolActiveIncrement);
        }
        if (eventDetail.name === 'ToolPanel' && eventDetail.type === 'click') {
            otherFunctions.unsetSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef);
        }
        if (eventDetail.name === 'RightSide' && eventDetail.type === 'mouseleave') {
            selectorWork.deActivateIncrement(boolActiveIncrement);
        }
        //console.log('TRACK EVENT S : ', eventDetail);


    }, [eventDetail])

    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(widthRef, "mousedown", bindedFunction.activeWidthIncrement);
        theEvent.setEvent(widthRef, "mousedown", bindedFunction.trackWidthRefDownEvent);
        theEvent.setEvent(heightRef, 'mousedown', bindedFunction.activeHeightIncrement);
        theEvent.setEvent(heightRef, 'mousedown', bindedFunction.trackHeightRefDownEvent);
        theEvent.setEvent(dotRef, 'mousedown', bindedFunction.activeDotIncrement);
        theEvent.setEvent(dotRef, 'mousedown', bindedFunction.trackDotRefDownEvent);
        theEvent.setEvent(moveRef, 'mousedown', bindedFunction.activeMovement);
        theEvent.setEvent(moveRef, 'mousedown', bindedFunction.trackMoveRefDownEvent);
        theEvent.setEvent(widthRef, "mouseup", bindedFunction.deActivateIncrement);

        return (() => {
            theEvent.returnEvents();
        })
    }, [])

    useEffect(() => {
        //console.log('the boolRef to run the increment is : ', boolActiveIncrement);

        if (boolActiveIncrement.current === 'width') {
            console.log('the width increment to be done');

            selectorWork.performWidthIncrement(selectedElem, mousePointerRef, widthRef, innerDiv);
            otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { move: true, dot: true, height: true });

        }
        if (boolActiveIncrement.current === 'height') {
            selectorWork.performHeightIncrement(selectedElem, mousePointerRef, heightRef, innerDiv);
            otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { move: true, dot: true, width: true });
        }
        if (boolActiveIncrement.current === 'dot') {


            selectorWork.performDotIncrement(selectedElem, mousePointerRef, dotRef, innerDiv);

            if (selectedElem.type === 'circle') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { move: true, dot: true });
            }
            else if (selectedElem.type === 'ellipse') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { move: true, dot: true, width: true, height: true });
            }
            else if (selectedElem.type === 'rectangle') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { width: true, height: true, move: true, dot: true });
            }
            else if (selectedElem.type === 'square') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { move: true, dot: true });
            }
            else if (selectedElem.type === 'triangle') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { move: true, dot: true, width: true, height: true });

            }

            //otherFunctions.showSelectorBody(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv);
        }
        if (boolActiveIncrement.current === 'move') {
            selectorWork.performMovement(selectedElem, innerDiv, moveRef, mousePointerRef);

            if (selectedElem.type === 'circle') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { dot: true });
            }
            else if (selectedElem.type === 'ellipse') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { dot: true, width: true, height: true });
            }
            else if (selectedElem.type === 'rectangle') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { width: true, height: true, dot: true });
            }
            else if (selectedElem.type === 'square') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { dot: true });
            }
            else if (selectedElem.type === 'triangle') {
                otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { dot: true, width: true, height: true });

            }
        }
    }, [mousePointer])

    return (
        <>
            <div ref={widthRef}

                style={{                        //width
                    left: '10px',
                    top: '10px',

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
            <div ref={moveRef}                 //move

                style={{
                    left: '40px',
                    top: '40px'
                }}
                className=" absolute size-4 rounded-full bg-amber-900" >

            </div>
        </>
    );
}



export { Selector }
