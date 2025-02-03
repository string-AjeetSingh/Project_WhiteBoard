import { useEffect, useRef, useState } from "react";
import { Panel } from "./subcomponents";
import '../../cssAnimations/navBar.css'



function NavBar({ }) {

    const panel = useRef({ on: null, off: null });
    const [panelBool, setpanelBool] = useState(0);

    function getNavProperties(got) {
        if (got) {
            panel.current.on = got.on;
            panel.current.off = got.off;
            console.log('the panel is : ', panel);
            return true;
        } else {
            return false;
        }
    }

    function handleButton() {
        panelBool === 1 ? setpanelBool(-1) : setpanelBool(1);
    }

    useEffect(() => {
        if (panelBool === 1) {
            panel.current.on();
        } else if (panelBool === -1) {

        }
    }, [panelBool])

    return (
        <>
            <div className="mb-0 z-[5]">

                <div className="p-2 rounded-tr-md rounded-tl-md
            bg-lightPanle flex flex-row justify-between items-center ">
                    <div>
                        <span className="text-2xl text-black">Logo</span>
                    </div>
                    <div>
                        <button onClick={handleButton}
                            className=" w-[30px] border border-transparent
                             rounded-sm  hover:border-darkPanle active:bg-darkPanle">
                            <hr className="border m-[5px] border-black"></hr>
                            <hr className="border m-[5px] border-black"></hr>
                            <hr className="border m-[5px] border-black"></hr>
                        </button>
                    </div>
                </div>
                {panelBool === 1 ?
                    <Panel func_OutNavProperties={getNavProperties} />
                    : null}
            </div>
        </>
    );
}


export { NavBar }