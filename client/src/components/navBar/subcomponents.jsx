import { useEffect, useRef } from "react";


function Panel({ func_OutNavProperties }) {

    const panelRef = useRef(null);

    function on() {
        panelRef.current.style.transform = "translateY(122%)";
        // panelRef.current.style.opacity = 1;
    }
    function off() {
        panelRef.current.style.transform = "translateY(-150px)";
        //panelRef.current.style.opacity = 0;
    }

    useEffect(() => {
        if (func_OutNavProperties && panelRef.current) {
            let res = func_OutNavProperties({ on: on, off: off });
            if (!res) {
                throw new Error("Invalid Parameter to func_OutNavProperties");
            }
        }
    }, [func_OutNavProperties, panelRef])


    return (
        <>
            <div ref={panelRef} className=" navPanel top-[-150px] z-[3]
            absolute w-full h-40 mt-1 bg-lightPanle  flex flex-col p-1  ">

                <PanelButton>Home</PanelButton>
                <PanelButton>Upgrade To Pro</PanelButton>
            </div>
        </>
    );
}

function PanelButton({ children, handleClick }) {
    return (
        <>
            <button onClick={() => {
                handleClick ? handleClick() : null;
            }} className=" flex flex-row w-full p-1 mb-1 mt-1 bg-darkPanle text-white rounded-sm">
                {children}
            </button>
        </>
    );
}


export { Panel }