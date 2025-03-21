import { NavBar } from "../components/navBar/navBar.jsx";
import { MainContainer } from "../components/mainContainer/mainContainer.jsx";
import { CommonContext } from "../myLib/commonContext/myContext.js"
import { useEventTracker } from "../hooks/eventTraker.js";
import { useRef } from 'react'


function Workspace({ }) {
    return (
        <>
            <main className="grow pb-2 
            flex flex-row  bg-lightPanle dark:bg-darkPanle 
            ">
                <MainContainer />
            </main>
        </>
    );
}



export { Workspace }