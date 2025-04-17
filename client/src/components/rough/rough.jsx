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
    return (
        <>
            <div ref={parentDiv} className=" relative
              p-2 m-10 bg-amber-700 rounded-lg  h-[500px] overflow-hidden">
                <div ref={innerDiv} style={{
                    transform: 'translateX(50px)'
                }}
                    className="relative w-full h-full">

                    <Box left={20} top={20} />
                    <Box left={200} top={200} />
                    <Box left={600} top={600} />
                    <Box left={-90} top={0} />
                    <Box left={-90} top={400} />
                </div>
                <ScrollBar parentDiv={parentDiv} innerDiv={innerDiv} />
            </div>
        </>
    );
}



export { Rough }