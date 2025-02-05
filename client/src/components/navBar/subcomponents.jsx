import { useEffect, useRef } from "react";


function Panel({ func_OutNavProperties }) {

    const panelRef = useRef(null);

    function on() {
        panelRef.current.classList.add('theactive');
    }
    function off() {
        panelRef.current.classList.remove('theactive');
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
            <div ref={panelRef} className=" navPanel z-[6]  dark:bg-darkPanle  opacity-0 
            
            absolute w-full h-40 mt-1 bg-lightPanle  flex flex-col p-1 border-b-2 border-darkPanle
            dark:border-lightPanle "
            >


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
            }} className=" flex flex-row w-full p-1 mb-1 mt-1 
            bg-darkPanle dark:bg-lightPanle dark:text-white text-black font-bold  rounded-sm">
                {children}
            </button>
        </>
    );
}


export { Panel }