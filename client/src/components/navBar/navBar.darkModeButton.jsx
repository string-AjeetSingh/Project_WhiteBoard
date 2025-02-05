import { useEffect, useRef } from "react";

function DarkModeToogle() {
    const toogleBool = useRef(localStorage.getItem('screenMode') === "dark" ? true : false);
    const transitionDiv = useRef(null);
    const transitionDark = useRef(null);
    const transitionLight = useRef(null);
    const outResult = useRef(null);


    function toogle(event) {
        event.stopPropagation();



        toogleBool.current ? toogleBool.current = false : toogleBool.current = true;

        if (toogleBool.current) {
            animateToDark();
            outResult.current = "dark";
        } else {
            animateToLight();
            outResult.current = "light";
        }

    }

    function animateToLight() {
        transitionDark.current.classList.remove('darkIconActive')
        transitionDiv.current.classList.remove('darkModeButtToogleActive');
        transitionLight.current.classList.remove('lightIconActive');

    }
    function animateToDark() {
        transitionDark.current.classList.add('darkIconActive')
        transitionDiv.current.classList.add('darkModeButtToogleActive');
        transitionLight.current.classList.add('lightIconActive');
        // transitionDiv.current.classList.remove('darkModeButtToogleActive');
    }

    function transitionendEvent(event) {

        localStorage.setItem('screenMode', outResult.current);
        toggleDarkMode();

    }


    const toggleDarkMode = () => {

        let thebody = document.getElementById("theBody");

        if (localStorage.getItem('screenMode')) {
            if (localStorage.getItem('screenMode') === 'light') {
                if (thebody.classList.contains('dark')) {

                    thebody.classList.replace('dark', 'light');
                } else {
                    thebody.classList.add('light');
                }
            } else if (localStorage.getItem('screenMode') === 'dark') {
                if (thebody.classList.contains('light')) {

                    thebody.classList.replace('light', 'dark');
                }
                else {
                    thebody.classList.add('dark');
                }
            }
        }
        // localStorage.setItem("theme", thebody.classList.contains("dark") ? "dark" : "light");
        //console.log(localStorage.getItem("theme"));

    };

    useEffect(() => {

        if (!localStorage.getItem('screenMode')) {
            localStorage.setItem('screenMode', 'light');
        }

        toggleDarkMode();

        if (transitionDiv.current) {
            transitionDiv.current.addEventListener('transitionend', transitionendEvent)
        }
        return () => {
            if (transitionDiv.current) {
                transitionDiv.current.removeEventListener('transitionend', transitionendEvent)
            }
        }

    }, [])


    if (localStorage.getItem('screenMode') === 'dark') {
        return (
            <>
                <button onClick={toogle}
                    className="w-[75px] flex  overflow-hidden 
                    flex-row items-center  relative h-[36px] bg-whiteBoard-one rounded-3xl m-1 ">
                    <div ref={transitionDiv} className="z-[1] absolute darkModeButtToogle
                    darkModeButtToogleActive  left-[1px] 
                     size-[34px] rounded-full bg-screenModeButton">

                    </div>
                    <img ref={transitionLight} src="/icons/light.png"
                        className="lightIcon lightIconActive relative size-7 ml-2  "></img>

                    <img ref={transitionDark} src="/icons/dark.png"
                        className="darkIcon darkIconActive relative size-7 ml-1 "></img>

                </button>
            </>
        );

    } else {
        return (
            <>
                <button onClick={toogle}
                    className="w-[75px] flex  overflow-hidden
                    flex-row items-center  relative h-[36px] bg-whiteBoard-one rounded-3xl m-1 ">
                    <div ref={transitionDiv} className="z-[1] absolute darkModeButtToogle  left-[1px]
                     size-[34px] rounded-full bg-screenModeButton">

                    </div>
                    <img ref={transitionLight} src="/icons/light.png"
                        className="lightIcon relative size-7 ml-2  "></img>

                    <img ref={transitionDark} src="/icons/dark.png"
                        className="darkIcon relative size-7 ml-1 "></img>

                </button>
            </>
        );

    }

}


export { DarkModeToogle }
