import { motion } from "framer-motion";
import "../../cssAnimations/rough.css";
import { useRef } from "react";
import { div } from "framer-motion/client";

function MyGrid({ }) {
    const divRef = useRef(null);
    const butRef = useRef(null);
    const toogleButt = useRef(false);
    console.log('button clicked : ', toogleButt.current);

    function anim(mode) {
        if (mode) {
            divRef.current.style.transform = "translateX(15%) rotate(10deg)";
        } else {
            divRef.current.style.transform = "translateX(0%) rotate(0deg)";
        }

    }

    function showClick() {
        console.log('button clicked : ', toogleButt.current);
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-2 text-center w-[500px] p-3 bg-pink-300 m-3 rounded-xl">
                <div className="bg-pink-500  col-start-2 col-end-4 row-start-2 row-end-4 rounded-md">1</div>
                <div className="bg-pink-500 rounded-md">2</div>
                <div className="bg-pink-500 rounded-md">3</div>
                <div className="bg-pink-500 rounded-md">4</div>
                <div className="bg-pink-500 rounded-md">5</div>

            </div>
            <div ref={divRef} className="nam m-3 bg-pink-400 p-4 size-40 rounded-3xl
            "
                style={{
                    boxShadow: "2px 2px 5px pink",
                }}>

            </div>
            <button ref={butRef} onClick={() => {
                toogleButt.current ? toogleButt.current = false :
                    toogleButt.current = true;
                showClick();
                anim(toogleButt.current);

            }}
                onMouseDown={() => {



                    butRef.current.style.transform = "scale(0.85)";
                }}
                onMouseUp={() => {


                    butRef.current.style.transform = "scale(1)";
                }}
                onMouseLeave={() => {


                    butRef.current.style.transform = "scale(1)";
                }}

                className="btn text-2xl p-3 m-3 bg-pink-500 text-pink-200">
                Run Animation
            </button>
        </>
    );
}


export { MyGrid }