
import { div } from "framer-motion/client";
import { useEffect, useState, useRef } from "react";

function WhiteBoard({ }) {
    const [scroll, setscroll] = useState([null, null]);
    const divelem = useRef(null);
    const innerDiv = useRef(null);
    const scrollControlBool = useRef(false);




    const handleScroll = () => {
        console.log('the scroll is : ', divelem.current.scrollTop, divelem.current.scrollLeft);
        console.log('  innerDiv.current.clientWidth : ', innerDiv.current.clientWidth);

        if (scrollControlBool.current) {

            if (divelem.current.scrollLeft < 10) {

                innerDiv.current.style.width = (innerDiv.current.clientWidth / 2) + "px"
            }
            if (divelem.current.scrollRight < 10) {

                innerDiv.current.style.width = (innerDiv.current.clientWidth / 2) + "px"
            }
        }
    }


    useEffect(() => {
        if (divelem.current) {
            divelem.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (divelem.current) {

                divelem.current.removeEventListener('scroll', handleScroll);
            }
        }

    }, [divelem.current])


    return (
        <>
            <div ref={divelem} className=" w-[500px] h-[500px] overflow-scroll 
             border-2 border-amber-600 rounded-2xl 
             p-3 relative "
            >
                <div ref={innerDiv} className="bg-whiteBoard-one h-[1000px] border-2 border-black top-0 left-0
                 text-black w-[1000px] absolute text-center ">
                    Hello Ajeetjjjjjjjjjjjjjjjjj
                    <div className="size-10 bg-amber-600">

                    </div>
                </div>
            </div>
            <div className="m-2 mt-5 text-[1.2rem] flex flex-row items-center ">
                <input onChange={(e) => {
                    if (e.target.checked) {
                        console.log("the scroll control enabled");
                        scrollControlBool.current = true;
                    } else {

                        scrollControlBool.current = false;
                        console.log("the scroll control disabled");
                    }
                }} className="size-5" type="checkbox">
                </input>
                <span className="ml-1">Enable Scroll Control</span>
            </div>
        </>
    );
}


export { WhiteBoard }