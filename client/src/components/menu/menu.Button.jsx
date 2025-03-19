import { menuWork } from "../../utilities/menu.Utilities";
import { useState, useRef, useEffect } from "react";
import { effectEventClass } from "../../myLib/effectEventClass";


function MenuButton({ firstWord, otherFollowingWord, src, specialOne, onClick }) {

    const button = useRef(null);
    const part1 = useRef(null);
    const part2 = useRef(null);

    const bindedFunction = {
        hoverActive: menuWork.handle.activeHoverStyle.bind(null, button),
        hoverDeActive: menuWork.handle.deActiveHoverStyle.bind(null, button),
        clickStyleStart: menuWork.handle.clickStyle.bind(null, button, 'start'),
        clickStyleOver: menuWork.handle.clickStyle.bind(null, button, 'over', onClick),
        touchStyleStart: menuWork.handle.touchStyle.bind(null, button, part1, part2, 'start'),
        touchStyleEnd: menuWork.handle.touchStyle.bind(null, button, part1, part2, 'end', onClick),
    }

    useEffect(() => {
        const theEvent = new effectEventClass();
        theEvent.setEvent(button, 'mouseenter', bindedFunction.hoverActive);
        theEvent.setEvent(button, 'mouseleave', bindedFunction.hoverDeActive);
        theEvent.setEvent(button, 'mousedown', bindedFunction.clickStyleStart);
        theEvent.setEvent(button, 'mouseup', bindedFunction.clickStyleOver);

        theEvent.setEvent(button, 'touchstart', bindedFunction.touchStyleStart);
        theEvent.setEvent(button, 'touchend', bindedFunction.touchStyleEnd);

        return (() => {
            theEvent.returnEvents();
        })
    }, []);

    return (
        <>
            <button ref={button} className="menu-button dark:bg-lightPanle bg-blue-300 p-1 min-w-[320px] w-full max-w-[500px] h-[100px] dark:text-blue-300 text-darkPanle
             mt-1 mb-2 rounded-md flex flex-row justify-around items-center overflow-hidden ">
                <div className="relative menu-part " ref={part1}>
                    {/* Style World Spans  */}
                    <div className="flex flex-row items-baseline justify-baseline">
                        <span className="text-6xl font-bold ">{firstWord}</span><span className="text-3xl relative right-[2px]">{otherFollowingWord}</span>
                    </div>

                    {/* Project Span  */}
                    <span className="relative bottom-2 left-11 ">Project</span>
                </div>

                {/* The Image Container  */}
                <div ref={part2}
                    style={{
                        position: 'relative',
                        bottom: specialOne ? "-20px" : null,
                        scale: specialOne ? "1.3" : null
                    }} className=" w-[130px] ml-10 scale-110 top-4 menu-part   ">

                    <img src={src} className="w-full">
                    </img>

                </div>

            </button>
        </>
    );
}



export { MenuButton }