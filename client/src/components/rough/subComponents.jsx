

import { useRef } from "react";

function KeyFrameTry({ }) {

    const buttRef = useRef(null);
    const toogle = useRef(false);

    function handleClick() {
        toogle.current ? toogle.current = false : toogle.current = true;
        if (toogle.current) {
            buttRef.current.classList.add("active");
        } else {
            buttRef.current.classList.remove("active");
        }
    }
    return (
        <>
            <div className="flex flex-row justify-center m-4 p-4">
                <div ref={buttRef} onClick={handleClick}
                    className="nam2 absolute size-32 rounded-xl bg-pink-500 ">

                </div>
            </div>
        </>
    );
}



export { KeyFrameTry }