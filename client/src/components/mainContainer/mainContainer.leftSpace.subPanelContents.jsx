import { useEffect, useRef, useState, useContext } from "react";
import { useIsTouch } from "../../hooks/isTouch";
import { addEvent, removeEvent } from "../../utilities/addRemoveEvent";
import { isTouchOrMouse, isDarkMode } from "../../utilities/mainContainer.Utilities";
import { CommonContext } from "../../myLib/commonContext/myContext";

function Shapes({ src, cssClass, name, index }) {
    const shapeDiv = useRef(null);
    let isTouch = useIsTouch();
    const { selectedShape } = useContext(CommonContext);

    function handleMouseEnter(event) {
        event.stopPropagation();
        shapeDiv.current.classList.add('shapeIconActive');
    }
    function handleMouseLeave() {
        shapeDiv.current.classList.remove('shapeIconActive');
    }

    function handleTouchStart(event) {
        event.stopPropagation();
        shapeDiv.current.classList.add('shapeIconActive');
    }
    function handleTouchEnd() {
        shapeDiv.current.classList.remove('shapeIconActive');
    }

    useEffect(() => {


        if (shapeDiv.current && isTouch === -1) {
            shapeDiv.current.addEventListener('mouseenter', handleMouseEnter);
            shapeDiv.current.addEventListener('mouseleave', handleMouseLeave);
        }
        else if (shapeDiv.current && isTouch === 1) {
            addEvent(shapeDiv, "touchstart", handleTouchStart);
            addEvent(shapeDiv, "touchend", handleTouchEnd);
        }

        return () => {

            if (shapeDiv.current && isTouch === -1) {
                shapeDiv.current.removeEventListener('mouseenter', handleMouseEnter)
                shapeDiv.current.removeEventListener('mouseleave', handleMouseLeave);
            } else if (shapeDiv.current && isTouch === 1) {
                removeEvent(shapeDiv, "touchstart", handleTouchStart);
                removeEvent(shapeDiv, "touchend", handleTouchEnd);
            }
        }


    }, [shapeDiv.current])
    return (
        <>
            <img onClick={() => {
                selectedShape.current = name;

            }} ref={shapeDiv} className={`size-24 m-2 shapeIcon ${cssClass}`} src={src}>
            </img>
        </>
    );
}

function BackGroundShow({ mode }) {

    const backDiv = useRef(null);

    function handleMouseEnter(event) {
        event.stopPropagation();
        backDiv.current.classList.add('backShowActive');
    }
    function handleMouseLeave() {
        backDiv.current.classList.remove('backShowActive');
    }

    useEffect(() => {
        if (backDiv.current) {
            backDiv.current.addEventListener('mouseenter', handleMouseEnter);
            backDiv.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (backDiv.current) {
                backDiv.current.removeEventListener('mouseenter', handleMouseEnter)
                backDiv.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        }


    }, [backDiv.current])

    if (mode === "white") {
        return (
            <>
                <div className="m-5 text-center">

                    <div
                        ref={backDiv} className={`backShow size-30 bg-white m-1  rounded-xl`}>

                    </div>
                    <span className="text-[1.2rem] font-bold dark:text-white">White</span>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <div className="m-5 text-center">

                    <div
                        ref={backDiv} className={`backShow size-30 bg-whiteBoard-one m-1 rounded-xl`}>

                    </div>
                    <span className="text-[1.2rem] font-bold dark:text-white">White Blue</span>
                </div>
            </>
        );
    }
}

function Button_DrawWidth({ }) {
    return (
        <>

            <button
                className=" size-14 rounded-md flex flex-col items-center justify-around
             dark:bg-lightPanle bg-darkPanle mb-2 
             p-2">
                <hr className="h-[2px] w-full bg-whiteBoard-one"></hr>
                <hr className="h-[5px] w-full bg-whiteBoard-one"></hr>
                <hr className="h-[7px] w-full bg-whiteBoard-one"></hr>
                <hr className="h-[10px] w-full bg-whiteBoard-one"></hr>

            </button>

        </>
    );
}

function Button_DrawColor({ }) {
    return (
        <>
            <button>
                <div className="size-14 mb-2  rounded-full dark:bg-lightPanle bg-darkPanle">

                </div>
            </button>
        </>
    );
}

function Button_Eraser({ }) {
    const buttRef = useRef(null);
    const imgRef = useRef(null);
    let isTouch = useIsTouch();
    const toogleButt = useRef("off");

    const eraser = {
        active: 'eraserActive',
        select: "eraserActiveSelect"
    }

    function toogleButton() {
        if (toogleButt.current === "off") {
            toogleButt.current = "on";
        } else if (toogleButt.current === "on") {
            toogleButt.current = "off";
        }
    }

    const ActiveWork = {
        Active: (theRef, className, event) => {
            event.stopPropagation();
            theRef.current.classList.add(className);
        },
        Deactive: (theRef, className) => {
            theRef.current.classList.remove(className);
        },
    }

    const Bound = {
        imgRefActive: ActiveWork.Active.bind(null, imgRef, eraser.active),
        imgRefDeactive: ActiveWork.Deactive.bind(null, imgRef, eraser.active),
        buttRefActive: ActiveWork.Active.bind(null, buttRef, eraser.select),
        buttRefDeactive: ActiveWork.Deactive.bind(null, buttRef, eraser.select),
    }

    useEffect(() => {
        if (isTouchOrMouse(isTouch, imgRef) === "mouse") {
            addEvent(imgRef, "mouseenter", Bound.imgRefActive);
            addEvent(imgRef, "mouseleave", Bound.imgRefDeactive)

        }
        return () => {
            if (isTouchOrMouse(isTouch, imgRef) === "mouse") {
                addEvent(imgRef, "mouseenter", Bound.imgRefActive);
                removeEvent(imgRef, "mouseleave", Bound.imgRefDeactive)
            }

        }

    }, [imgRef.current, isTouch])

    useEffect(() => {
        if (isTouchOrMouse(isTouch, imgRef) === "mouse") {
            addEvent(buttRef, "mousedown", Bound.buttRefActive);
            addEvent(buttRef, "mouseup", Bound.buttRefDeactive);

        }
        else if (isTouchOrMouse(isTouch, imgRef) === "touch") {
            addEvent(imgRef, "touchstart", Bound.imgRefActive);
            addEvent(imgRef, "touchend", Bound.imgRefDeactive)
            addEvent(buttRef, "touchstart", Bound.buttRefActive);
            addEvent(buttRef, "touchend", Bound.buttRefDeactive);
        }

        return () => {
            if (isTouchOrMouse(isTouch, imgRef) === "mouse") {
                removeEvent(buttRef, "mousedown", Bound.buttRefActive);
                removeEvent(buttRef, "mouseup", Bound.buttRefDeactive);
            }
            else if (isTouchOrMouse(isTouch, imgRef) === "touch") {
                removeEvent(imgRef, "touchstart", Bound.imgRefActive);
                removeEvent(imgRef, "touchend", Bound.imgRefDeactive)
                removeEvent(buttRef, "touchstart", Bound.buttRefActive);
                removeEvent(buttRef, "touchend", Bound.buttRefDeactive);
            }
        }

    }, [buttRef.current])


    return (
        <>
            <button ref={buttRef}
                className="eraser flex flex-row justify-center 
                size-14 mb-2 rounded-md dark:bg-lightPanle bg-darkPanle overflow-hidden ">
                <img ref={imgRef} className="w-10 eraser relative top-3 " src={isDarkMode() === "dark" ? 'icons/eraserDark.png' :
                    isDarkMode() === "light" ? 'icons/eraserLight.png' : null
                }></img>
            </button>
        </>
    );
}



function Sticks({ }) {
    const pen4Butt = useRef(null);
    const pen5Butt = useRef(null);
    let isTouch = useIsTouch();
    const buttOnBool = useRef(0);

    //common : 
    function pen4Active(event) {
        event.stopPropagation();
        pen4Butt.current.classList.add('pen4Active');
    }

    function pen4Deactive() {
        pen4Butt.current.classList.remove('pen4Active');
    }
    function pen5Active(event) {
        event.stopPropagation();
        pen5Butt.current.classList.add('pen5Active');
    }
    function pen5Deactive() {
        pen5Butt.current.classList.remove('pen5Active');
    }

    // Mouse : 
    function pen4ActiveSelect(event) {
        event.stopPropagation();
        if (buttOnBool.current === 2) {
            pen5Deactive();
            pen5DeactiveSelect();

        } else if (buttOnBool.current === 1) {
            pen4Deactive();
            pen4DeactiveSelect();

            buttOnBool.current = 0;
            return;
        }
        buttOnBool.current = 1;
        pen4Butt.current.classList.add('pen4ActiveSelect');
    }
    function pen4DeactiveSelect() {
        pen4Butt.current.classList.remove('pen4ActiveSelect');
    }
    function pen5ActiveSelect(event) {
        event.stopPropagation();
        if (buttOnBool.current === 1) {
            pen4Deactive();
            pen4DeactiveSelect();
        } else if (buttOnBool.current === 2) {
            pen5Deactive();
            pen5DeactiveSelect();
            buttOnBool.current = 0;
            return;
        }
        buttOnBool.current = 2;
        pen5Butt.current.classList.add('pen5ActiveSelect');
    }
    function pen5DeactiveSelect() {
        pen5Butt.current.classList.remove('pen5ActiveSelect');
    }

    //Touch :
    function pen4TouchActiveSelect(event) {
        event.stopPropagation();
        if (buttOnBool.current === 2) {
            pen5TouchDeactiveSelect();

        } else if (buttOnBool.current === 1) {
            pen4TouchDeactiveSelect();
            buttOnBool.current = 0;
            return;
        }
        buttOnBool.current = 1;
        pen4Butt.current.classList.add('pen4TouchActiveSelect');
    }
    function pen4TouchDeactiveSelect() {
        pen4Butt.current.classList.remove('pen4TouchActiveSelect');
    }
    function pen5TouchActiveSelect(event) {
        event.stopPropagation();
        if (buttOnBool.current === 1) {
            pen4TouchDeactiveSelect();
        } else if (buttOnBool.current === 2) {
            pen5TouchDeactiveSelect();
            buttOnBool.current = 0;
            return;
        }
        buttOnBool.current = 2;
        pen5Butt.current.classList.add('pen5TouchActiveSelect');
    }
    function pen5TouchDeactiveSelect() {
        pen5Butt.current.classList.remove('pen5TouchActiveSelect');
    }

    useEffect(() => {
        if (isTouchOrMouse(isTouch, pen4Butt) === 'mouse') {
            addEvent(pen4Butt, "mouseenter", pen4Active);
            addEvent(pen4Butt, "mouseleave", pen4Deactive);
            addEvent(pen4Butt, "click", pen4ActiveSelect);
        }
        else if (isTouchOrMouse(isTouch, pen4Butt) === 'touch') {
            addEvent(pen4Butt, "touchstart", pen4TouchActiveSelect);
        }

        return () => {

            if (isTouchOrMouse(isTouch, pen4Butt) === 'mouse') {
                removeEvent(pen4Butt, "mouseenter", pen4Active);
                removeEvent(pen4Butt, "mouseleave", pen4Deactive);
                removeEvent(pen4Butt, "click", pen4ActiveSelect);
            }
            else if (isTouchOrMouse(isTouch, pen4Butt) === 'touch') {
                removeEvent(pen4Butt, "touchstart", pen4TouchActiveSelect);
            }
        }

    }, [pen4Butt, isTouch]);

    useEffect(() => {
        if (isTouchOrMouse(isTouch, pen5Butt) === 'mouse') {

            addEvent(pen5Butt, "mouseenter", pen5Active);
            addEvent(pen5Butt, "mouseleave", pen5Deactive);
            addEvent(pen5Butt, "click", pen5ActiveSelect);
        }
        else if (isTouchOrMouse(isTouch, pen5Butt) === 'touch') {
            addEvent(pen5Butt, "touchstart", pen5TouchActiveSelect);
        }

        return () => {
            if (isTouchOrMouse(isTouch, pen5Butt) === 'mouse') {
                removeEvent(pen5Butt, "mouseenter", pen5Active);
                removeEvent(pen5Butt, "mouseleave", pen5Deactive);
                removeEvent(pen5Butt, "click", pen5ActiveSelect);
            }
            else if (isTouchOrMouse(isTouch, pen5Butt) === 'touch') {
                removeEvent(pen5Butt, "touchstart", pen5TouchActiveSelect);
            }
        }

    }, [pen5Butt, isTouch]);

    return (
        <>
            <div className="rounded-3xl relative w-[85px] self-start mb-2 
                         h-[250px] bg-whiteBoard-one flex flex-col">

                <button ref={pen4Butt} className=" pen4
                            relative w-fit h-fit  rotate-90 top-1 right-4 ">
                    <img className="  w-16  " src={isDarkMode() === "light" ? '/icons/pen4f.png' :
                        isDarkMode() === "dark" ? '/icons/pen4fLight.png' : null}></img>
                </button>
                <button ref={pen5Butt} className="pen5 relative w-fit h-fit  rotate-90 
                            right-5
                            bottom-20 ">
                    <img className="  w-16  " src={isDarkMode() === "light" ? "/icons/pen5f.png" :
                        isDarkMode() === "dark" ? '/icons/pen5fLight.png' : null
                    }></img>
                </button>

            </div>
        </>
    );
}




function SubPanelContent({ index }) {

    if (index === 1) {

        if (localStorage.getItem('screenMode') === 'dark') {
            return (
                <>
                    <div className="w-full flex flex-row flex-wrap justify-around 
                     m-2  ">

                        <Shapes name={'square'} src="/icons/squareShapeLight.png" />
                        <Shapes name={'rectangle'} src="/icons/rectangleShapeLight.png" />
                        <Shapes name={'circle'} src="/icons/circleShapeLight.png" />
                        <Shapes name={'triangle'} src="/icons/triangleShapeLight.png" />
                        <Shapes name={'ellipse'} src="/icons/ovalShapeLight.png" />
                    </div>
                </>
            );

        } else if (localStorage.getItem('screenMode') === 'light') {
            return (
                <>
                    <div className="w-full flex flex-row flex-wrap justify-around 
                     m-2  ">

                        <Shapes name={'square'} src="/icons/squareShape.png" />
                        <Shapes name={'rectangle'} src="/icons/rectangleShape.png" />
                        <Shapes name={'circle'} src="/icons/circleShape.png" />
                        <Shapes name={'triangle'} src="/icons/triangleShape.png" />
                        <Shapes name={'ellipse'} src="/icons/ovalShape.png" />
                    </div>
                </>
            );

        }

    }

    else if (index === 2) {
        return (
            <>

                <div className="w-full grow  flex flex-row
                border border-amber-800 self-start   ">
                    <div className=" w-3 z-[1]  bg-lightPanle dark:bg-darkPanle">

                    </div>
                    <div className=" w-full grow mt-2 mb-2  flex flex-col items-between max-w-[250px]
                 self-start  h-[500px]">

                        <Sticks />
                        <Button_Eraser />
                        <Button_DrawWidth />
                        <Button_DrawColor />
                    </div>
                </div>
            </>
        );

    }
    else if (index === 3) {
        return (
            <>

                <div className="w-full flex flex-col items-center justify-center
                 grow m-2   ">
                    <BackGroundShow mode={"white"} />

                    <BackGroundShow />
                </div>
            </>
        );

    }

}


export { SubPanelContent }