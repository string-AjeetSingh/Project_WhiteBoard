import { useRef, useEffect, useState } from "react";
import "../../cssAnimations/rough.css";
import ScrollBar from "../scrollBar/scrollBar";




function Box({ left, top }) {
    return (
        <>
            <div
                style={{
                    left: left + 'px',
                    top: top + 'px'
                }}
                className="absolute size-20 bg-blue-500 rounded-b-md">

            </div>
        </>
    );
}



function Rough({ }) {
    const innerDiv = useRef(null);
    const parentDiv = useRef(null);
    const [parentDimention, setPDimention] = useState({
        width: 400,
        height: 500
    })
    const [childDimention, setCDimention] = useState({
        width: 1000,
        height: 2000,
        scaled: 1.10,
    })
    return (
        <>
            <div ref={parentDiv} style={{
                width: parentDimention.width + 'px',
                height: parentDimention.height + 'px'
            }}
                className="relative m-10 overflow-hidden bg-amber-800 ">
                <div
                    style={{ transform: `scale(${childDimention.scaled})` }}
                    ref={innerDiv} className="absolute size-[800px] bg-amber-300">
                    <Box left={10} top={10} />
                    <Box left={5} top={50} />
                    <Box left={200} top={400} />
                    <Box left={500} top={500} />
                </div>
                <ScrollBar viewHeight={parentDimention.height} viewWidth={parentDimention.width}
                    parentRef={parentDiv} childRef={innerDiv} childScaled={childDimention.scaled} />
            </div>
        </>
    );
}



export { Rough }