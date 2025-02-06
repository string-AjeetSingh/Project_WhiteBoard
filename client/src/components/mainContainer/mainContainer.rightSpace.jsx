import { CommonContext } from "../../myLib/commonContext/myContext";
import { useContext, useEffect, useRef } from "react";
function RightSpace({ }) {
    const { trackEvent } = useContext(CommonContext);
    const rightSideDiv = useRef(null);

    function handleMouseEnter(event) {
        event.stopPropagation();
        trackEvent("RightSpace", "mouseenter");
    }

    useEffect(() => {


        if (rightSideDiv) {
            rightSideDiv.current.addEventListener("mouseenter", handleMouseEnter);
        }
        return () => {
            if (rightSideDiv) {

                rightSideDiv.current.removeEventListener("mouseenter", handleMouseEnter);
            }
        }

    }, [rightSideDiv])
    return (
        <>
            <div ref={rightSideDiv} className="basis-[100%] mr-2 mt-2 rounded-md   bg-whiteBoard-one">

            </div>
        </>
    );
}




export { RightSpace }