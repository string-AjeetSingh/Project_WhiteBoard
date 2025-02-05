import { useEffect, useRef, useState } from "react";
import { Panel } from "./subcomponents";
import '../../cssAnimations/navBar.css'
import { DarkModeToogle } from "./navBar.darkModeButton";



function NavBar({ }) {

    const panel = useRef({ on: null, off: null });
    const [panelBool, setpanelBool] = useState(0);

    function getNavProperties(got) {
        if (got) {
            panel.current.on = got.on;
            panel.current.off = got.off;

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
            panel.current.off();
        }
    }, [panelBool])

    return (
        <>

            <div className="p-2 rounded-tr-md rounded-tl-md z-[7] relative 
            bg-lightPanle dark:bg-darkPanle  flex flex-row justify-between items-center ">
                {/*Nav Left Side Items   */}
                <div>
                    <span className="text-2xl font-bold text-black dark:text-white">Logo</span>
                </div>

                {/*Nav Right Side Buttons   */}
                <div className=" flex flex-row items-center">

                    <DarkModeToogle />

                    <button onClick={handleButton}
                        className=" w-[30px] border border-transparent
                             rounded-sm  hover:border-darkPanle active:bg-darkPanle">
                        <hr className="border m-[5px] border-black dark:border-white"></hr>
                        <hr className="border m-[5px] border-black dark:border-white"></hr>
                        <hr className="border m-[5px] border-black dark:border-white"></hr>
                    </button>
                </div>
            </div>


            <Panel func_OutNavProperties={getNavProperties} />

        </>
    );
}


export { NavBar }