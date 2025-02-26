import { useEffect, useContext } from "react";
import { effectEventClass } from "../myLib/effectEventClass";
import { CommonContext } from "../myLib/commonContext/myContext";
import { mouseEvent } from "../utilities/whiteBoard.Utilities";

const useWhiteboardEvents = (innerDiv, divelem, bindedFunction) => {



    useEffect(() => {
        if (divelem.current) {

            divelem.current.scrollTop = (divelem.current.scrollHeight - divelem.current.clientHeight) / 2;
            divelem.current.scrollLeft = (divelem.current.scrollWidth - divelem.current.clientWidth) / 2;
            divelem.current.addEventListener('scroll', bindedFunction.handleScroll);
        }
        return () => {
            if (divelem.current) {
                divelem.current.removeEventListener('scroll', bindedFunction.handleScroll);
            }
        };
    }, [divelem.current]);

    useEffect(() => {

        const theEvents = new effectEventClass();
        theEvents.setEvent(innerDiv, 'mousedown', bindedFunction.mouseMiddleDown);
        theEvents.setEvent(innerDiv, 'mousedown', bindedFunction.mouseDown);
        theEvents.setEvent(innerDiv, 'mousedown', bindedFunction.createShape);
        theEvents.setEvent(innerDiv, 'mousedown', bindedFunction.trackInnerDivMouseDown);
        theEvents.setEvent(innerDiv, 'mousemove', bindedFunction.mouseMove);
        theEvents.setEvent(innerDiv, 'mouseup', bindedFunction.mouseMiddleUp);
        theEvents.setEvent(innerDiv, 'mouseup', bindedFunction.trackInnerDivMouseUp);
        theEvents.setEvent(innerDiv, 'mouseleave', bindedFunction.mouseLeave);
        theEvents.setEvent(innerDiv, 'mouseleave', bindedFunction.trackInnerDivMouseLeave);
        theEvents.setEvent(innerDiv, 'wheel', bindedFunction.wheelZoom);


        return () => theEvents.returnEvents();
    }, [innerDiv.current]);

    useEffect(() => {
        window.addEventListener('keydown', bindedFunction.preventMouseZoom);
        window.addEventListener('keyup', bindedFunction.resumeMouseZoom);
        return () => {
            window.removeEventListener('keydown', bindedFunction.preventMouseZoom);
            window.removeEventListener('keyup', bindedFunction.resumeMouseZoom);
        };
    }, []);
};


export { useWhiteboardEvents }