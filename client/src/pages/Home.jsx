import { NavBar } from "../components/navBar/navBar";
import { MainContainer } from "../components/mainContainer/mainContainer";
import { CommonContext } from "../myLib/commonContext/myContext.js"
import { useEventTracker } from "../hooks/eventTraker.js";
import { useRef } from 'react'


function Home({ }) {
    const [trackEvent, eventDetail] = useEventTracker();
    const aCommunication = useRef({});
    return (
        <>
            <CommonContext.Provider value={{ trackEvent, eventDetail, aCommunication }}>
                <header>
                    <NavBar />
                </header>
                <hr className="border relative dark:border-lightPanle border-darkPanle z-[5]" />

                <main className="grow pb-2 
            flex flex-row  bg-lightPanle dark:bg-darkPanle 
            ">
                    <MainContainer />
                </main>
            </CommonContext.Provider>
        </>
    );
}



export { Home }