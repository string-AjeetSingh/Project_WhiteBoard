import { NavBar } from "../components/navBar/navBar";
import { MainContainer } from "../components/mainContainer/mainContainer";
import { CommonContext } from "../myLib/commonContext/myContext.js"
import { useEventTracker } from "../hooks/eventTraker.js";

function Home({ }) {
    const [trackEvent, eventDetail] = useEventTracker();
    return (
        <>
            <CommonContext.Provider value={{ trackEvent, eventDetail }}>
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