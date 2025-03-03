import "../../cssAnimations/propertiesPanel.css"
import { useRef, useState, useEffect } from "react";


function PropertiesPanel({ out_Functionality }) {

    const pPanelRef = useRef(null);

    function on() {
        pPanelRef.current.classList.add('pPanleActive');
    }
    function off() {
        pPanelRef.current.classList.remove('pPanleActive');
    }

    useEffect(() => {
        if (out_Functionality) {
            out_Functionality({ on: on, off: off });
        }
    }, [out_Functionality])

    return (
        <>

            <div ref={pPanelRef} className="pPanle  border border-amber-700 bottom-0 
            absolute self-start grow bg-lightPanle mt-1 h-full  w-[30vw]
            min-w-[250px] max-w-[300px] rounded-tr-md dark:bg-darkPanle
              flex flex-col items-center overflow-hidden pt-2 pb-2 z-[4] ">

                i am prop panel
            </div>

        </>
    );
}






export { PropertiesPanel }