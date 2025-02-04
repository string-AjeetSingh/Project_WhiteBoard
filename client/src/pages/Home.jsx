import { NavBar } from "../components/navBar/navBar";
import { MainContainer } from "../components/mainContainer/mainContainer";

function Home({ }) {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <hr className="border relative dark:border-lightPanle border-darkPanle z-[5]" />
            <main className="grow pb-2 
            flex flex-row  bg-lightPanle dark:bg-darkPanle 
            ">
                <MainContainer />
            </main>
        </>
    );
}



export { Home }