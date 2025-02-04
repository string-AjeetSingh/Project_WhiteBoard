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

            return true;
        } else {
            return false;
        }
    }

    function handleButton() {
        panelBool === 1 ? setpanelBool(-1) : setpanelBool(1);
    }

    const toggleDarkMode = () => {


        let thebody = document.getElementById("theBody");
        thebody.classList.toggle("dark");
        // localStorage.setItem("theme", thebody.classList.contains("dark") ? "dark" : "light");
        //console.log(localStorage.getItem("theme"));

    };

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

                    <button onClick={toggleDarkMode} className="darkbutt rounded-md p-2  
                        bg-whiteBoard-one text-darkPanle">
                        Dark Mode Toogle
                    </button>

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