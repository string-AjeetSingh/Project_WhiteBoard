import { CommonContext } from "../../myLib/commonContext/myContext";
import { useContext, useEffect, useRef } from "react";
import { WhiteBoard } from "../whiteBoard/whiteBoard";

function RightSpace({ }) {
    const { trackEvent } = useContext(CommonContext);
    const rightSideDiv = useRef(null);

    function handleMouseEnter(event) {
        event.stopPropagation();
        trackEvent("RightSpace", "mouseenter");
        trackEvent("RightSpace", "mouseleave");
    }

    function trackMouseLeave() {
        trackEvent("RightSpace", "mouseleave");
    }

    useEffect(() => {


        if (rightSideDiv.current) {
            rightSideDiv.current.addEventListener("mouseenter", handleMouseEnter);
            rightSideDiv.current.addEventListener("mouseleave", trackMouseLeave);
        }
        return () => {
            if (rightSideDiv.current) {

                rightSideDiv.current.removeEventListener("mouseenter", handleMouseEnter);
                rightSideDiv.current.removeEventListener("mouseleave", trackMouseLeave);
            }
        }

    }, [rightSideDiv])
    return (
        <>
            <div ref={rightSideDiv} className="basis-[100%] 
            mr-2 mt-2 rounded-md overflow-scroll   bg-whiteBoard-one">
                <WhiteBoard />
            </div>
        </>
    );
}




export { RightSpace }