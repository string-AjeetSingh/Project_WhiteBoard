import { useEffect, useRef, useState, useContext } from "react";
import { useIsTouch } from "../../hooks/isTouch";
import { addEvent, removeEvent } from "../../utilities/addRemoveEvent";
import { isTouchOrMouse, isDarkMode } from "../../utilities/mainContainer.Utilities";
import { CommonContext } from "../../myLib/commonContext/myContext";
import defaultDraw from '../../myJSON/draw.default.json';


function Shapes({ src, cssClass, name, index }) {
    const shapeDiv = useRef(null);
    let isTouch = useIsTouch();
    const { selectedItem } = useContext(CommonContext);

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
                selectedItem.type = 'shapes';
                selectedItem.current = name;

            }} ref={shapeDiv} className={`size-24 m-2 shapeIcon ${cssClass}`} src={src}>
            </img>
        </>
    );
}

function ColorButton({ hex, setColor, transparent, heighLight, atClick, index }) {
    return (
        <>
            {transparent ?
                <button
                    style={{
                        border: '2px solid',
                        borderColor: heighLight ? 'whitesmoke' : 'transparent'
                    }}
                    className="size-9  rounded-full m-1 overflow-hidden"
                    onClick={() => {
                        if (atClick) {
                            atClick('transparent', index);
                        }
                        //console.log("the color selected is : ", 'transparent');
                    }}>
                    <img className="w-full scale-[250%]" src="./icons/transparent.jpg"></img>
                </button>
                :
                <button style={{
                    backgroundColor: hex,
                    border: '2px solid',
                    borderColor: heighLight ? 'whitesmoke' : 'transparent'
                }}
                    className="size-9 rounded-full m-1"
                    onClick={() => {
                        if (atClick) {
                            atClick(hex, index);
                        }
                        //console.log("the color selected is : ", hex);
                    }}>

                </button>
            }
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
    const { selectedItem } = useContext(CommonContext);
    const [penProperties, setPenProperties] = useState({ lineWidth: defaultDraw.pen.lineWidth });
    const { aCommunication } = useContext(CommonContext);

    useEffect(() => {
        if (aCommunication.current) {
            aCommunication.current.fromLineWidthInput = { setLineWidth: setPenProperties };
        }
        if (selectedItem.pen) {
            //update the given state , on function here penStyle changes. Must be in Draw.jsx hook
            selectedItem.pen.setPenStyleCallback(setPenProperties);
        }
    }, [])

    /* 
    
    
    useEffect(() => {
         console.log('the pen properties : ', penProperties);
    }, [penProperties])
    */

    return (
        <>

            <div className="  m-1 border-amber-400 item-center text-screenModeButton  dark:text-whiteBoard-one ">
                <span className="font-bold ">Pen Width </span><br></br>
                <input
                    type="number"
                    value={penProperties.lineWidth}
                    onChange={(e) => {
                        let value = e.target.value;
                        if (value === '') {
                            value = "zero";
                        }
                        else if (value.startsWith('0')) {
                            console.log("contain leading zero");
                            value = value.replace(/^0+/, "");
                        }
                        else {
                            value = parseFloat(value);
                        }
                        console.log('the new line width is  : ', value);
                        selectedItem.pen.penStyle(value, null);
                    }} className="w-16 p-1 rounded-md bg-slate-400"></input>
            </div>

        </>
    );
}


function Button_DrawColor({ handleColor, giveLight }) {


    // const [giveLight, setLight] = useState([true]);
    //const { selectedItem } = useContext(CommonContext);

    /* 
    
    function handleColor(val, index) {
        console.log('color for pen selected is  : ', val);
        let newOne = giveLight.slice();
        
        if (heighLight.current.previousHeighLight >= 0) {       //check if previous heightLight, if then remove , set to false.
        console.log('the previous HeighLight is : ', heighLight.current.previousHeighLight);
        newOne[heighLight.current.previousHeighLight] = false;
    }
    newOne[index] = true;
    
    setLight(newOne);
    
    heighLight.current.previousHeighLight = index;  //set previous index for heightLight
    selectedItem.pen.penStyle(null, val);
}

*/


    return (
        <>
            <div>
                <span className="text-1xl ml-1 font-bold dark:text-whiteBoard-one text-screenModeButton self-start">
                    Default Colors
                </span>
                <div className="flex flex-row flex-wrap ">
                    <ColorButton index={0} heighLight={giveLight[9]} hex={'#000000'} atClick={handleColor} />
                    <ColorButton index={1} heighLight={giveLight[1]} hex={'#ff66c4'} atClick={handleColor} />
                    <ColorButton index={2} heighLight={giveLight[2]} hex={'#cb6ce6'} atClick={handleColor} />
                    <ColorButton index={3} heighLight={giveLight[3]} hex={'#5e17eb'} atClick={handleColor} />
                    <ColorButton index={4} heighLight={giveLight[4]} hex={'#0097b2'} atClick={handleColor} />
                    <ColorButton index={5} heighLight={giveLight[5]} hex={'#0cc0df'} atClick={handleColor} />
                    <ColorButton index={6} heighLight={giveLight[6]} hex={'#7ed957'} atClick={handleColor} />
                    <ColorButton index={7} heighLight={giveLight[7]} hex={'#ffbd59'} atClick={handleColor} />
                    <ColorButton index={8} heighLight={giveLight[8]} hex={'#ff914d'} atClick={handleColor} />
                    <ColorButton index={9} heighLight={giveLight[0]} hex={'#ff5757'} atClick={handleColor} />
                    <ColorButton index={10} heighLight={giveLight[10]} hex={'#545454'} atClick={handleColor} />
                    <ColorButton index={11} heighLight={giveLight[11]} hex={'#a6a6a6'} atClick={handleColor} />
                    <ColorButton index={12} heighLight={giveLight[12]} hex={'#d9d9d9'} atClick={handleColor} />
                </div>
            </div>
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



function Sticks({ pen4Butt, pen5Butt, eraserButt, buttOnBool, prevClass }) {
    /* 
    const pen4Butt = useRef(null);
    const pen5Butt = useRef(null);
    const buttOnBool = useRef(0);
    */
    const [defaultAnimationClass1, setAnimationClass1] = useState(null);
    const [defaultAnimationClass2, setAnimationClass2] = useState(null);
    let isTouch = useIsTouch();

    const { selectedItem } = useContext(CommonContext);

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
    function eraserActive(event) {
        event.stopPropagation();
        eraserButt.current.classList.add('eraserActive');
    }
    function eraserDeactive() {
        eraserButt.current.classList.remove('eraserActive');
    }

    // Mouse : 
    function pen4ActiveSelect(event) {
        if (event) event.stopPropagation();
        if (buttOnBool.current === 2) {
            pen5Deactive();
            pen5DeactiveSelect();

        } else if (buttOnBool.current === 1) {
            pen4Deactive();
            pen4DeactiveSelect();

            buttOnBool.current = 0;
            return;
        } else if (buttOnBool.current === 3) {
            eraserDeactive();
            eraserDeactiveSelect();
        }
        buttOnBool.current = 1;

        pen4Butt.current.classList.add('pen4ActiveSelect');
        prevClass.current = { pen4Class: 'pen4ActiveSelect' };
    }
    function pen4DeactiveSelect() {
        pen4Butt.current.classList.remove('pen4ActiveSelect');
        prevClass.current = { pen4Class: null };
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
        } else if (buttOnBool.current === 3) {
            eraserDeactive();
            eraserDeactiveSelect();
        }
        buttOnBool.current = 2;

        pen5Butt.current.classList.add('pen5ActiveSelect');
        prevClass.current = { pen5Class: "pen5ActiveSelect" };
    }
    function pen5DeactiveSelect() {
        pen5Butt.current.classList.remove('pen5ActiveSelect');
        prevClass.current = { pen5Class: null };
    }
    function eraserActiveSelect(event) {
        event.stopPropagation();
        if (buttOnBool.current === 1) {
            pen4Deactive();
            pen4DeactiveSelect();
        } else if (buttOnBool.current === 3) {
            eraserDeactive();
            eraserDeactiveSelect();
            buttOnBool.current = 0;
            return;
        } else if (buttOnBool.current === 2) {
            pen5Deactive();
            pen5DeactiveSelect();
        }
        buttOnBool.current = 3;

        eraserButt.current.classList.add('eraserActiveSelect');
        prevClass.current = { eraserClass: "eraserActiveSelect" };
    }
    function eraserDeactiveSelect() {
        eraserButt.current.classList.remove('eraserActiveSelect');
        prevClass.current = { eraserClass: null };
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
    function selectPen1() {
        // alert('pen1');
        selectedItem.type = 'pens';
        selectedItem.current = 'pen1';
        selectedItem.pen.penStyle(null, null, 1);
    }

    function selectPen2() {
        //alert('pen2');
        selectedItem.type = 'pens';
        selectedItem.current = 'pen2';
        selectedItem.pen.penStyle(null, null, 2);
    }

    function selectEraser() {

        selectedItem.type = 'pens';
        selectedItem.current = 'eraser';
    }

    useEffect(() => {
        if (isTouchOrMouse(isTouch, pen4Butt) === 'mouse') {
            addEvent(pen4Butt, "mouseenter", pen4Active);
            addEvent(pen4Butt, "mouseleave", pen4Deactive);
            addEvent(pen4Butt, "click", pen4ActiveSelect);
            addEvent(pen4Butt, "click", selectPen1);
        }
        else if (isTouchOrMouse(isTouch, pen4Butt) === 'touch') {
            addEvent(pen4Butt, "touchstart", pen4TouchActiveSelect);
        }

        return () => {

            if (isTouchOrMouse(isTouch, pen4Butt) === 'mouse') {
                removeEvent(pen4Butt, "mouseenter", pen4Active);
                removeEvent(pen4Butt, "mouseleave", pen4Deactive);
                removeEvent(pen4Butt, "click", pen4ActiveSelect);
                removeEvent(pen4Butt, "click", selectPen1);
            }
            else if (isTouchOrMouse(isTouch, pen4Butt) === 'touch') {
                removeEvent(pen4Butt, "touchstart", pen4TouchActiveSelect);
            }
        }

    }, [pen4Butt, isTouch]);

    useEffect(() => {
        if (isTouchOrMouse(isTouch, eraserButt) === 'mouse') {
            addEvent(eraserButt, "mouseenter", eraserActive);
            addEvent(eraserButt, "mouseleave", eraserDeactive);
            addEvent(eraserButt, "click", eraserActiveSelect);
            addEvent(eraserButt, "click", selectEraser);
        }
        else if (isTouchOrMouse(isTouch, eraserButt) === 'touch') {
            // addEvent(pen4Butt, "touchstart", pen4TouchActiveSelect);
        }

        return () => {

            if (isTouchOrMouse(isTouch, eraserButt) === 'mouse') {
                removeEvent(eraserButt, "mouseenter", eraserActive);
                removeEvent(eraserButt, "mouseleave", eraserDeactive);
                removeEvent(eraserButt, "click", eraserActiveSelect);
                removeEvent(eraserButt, "click", selectEraser);
            }
            else if (isTouchOrMouse(isTouch, eraserButt) === 'touch') {
                // removeEvent(pen4Butt, "touchstart", pen4TouchActiveSelect);
            }
        }

    }, [eraserButt, isTouch]);

    useEffect(() => {
        if (isTouchOrMouse(isTouch, pen5Butt) === 'mouse') {

            addEvent(pen5Butt, "mouseenter", pen5Active);
            addEvent(pen5Butt, "mouseleave", pen5Deactive);
            addEvent(pen5Butt, "click", pen5ActiveSelect);
            addEvent(pen5Butt, "click", selectPen2);
        }
        else if (isTouchOrMouse(isTouch, pen5Butt) === 'touch') {
            addEvent(pen5Butt, "touchstart", pen5TouchActiveSelect);
        }

        return () => {
            if (isTouchOrMouse(isTouch, pen5Butt) === 'mouse') {
                removeEvent(pen5Butt, "mouseenter", pen5Active);
                removeEvent(pen5Butt, "mouseleave", pen5Deactive);
                removeEvent(pen5Butt, "click", pen5ActiveSelect);
                removeEvent(pen5Butt, "click", selectPen2);
            }
            else if (isTouchOrMouse(isTouch, pen5Butt) === 'touch') {
                removeEvent(pen5Butt, "touchstart", pen5TouchActiveSelect);
            }
        }

    }, [pen5Butt, isTouch]);

    useEffect(() => {

        if (prevClass.current?.pen4Class) {
            setAnimationClass1(prevClass.current.pen4Class);
        } else if (prevClass.current?.pen5Class) {
            setAnimationClass2(prevClass.current.pen5Class);
        }
    }, [])

    return (
        <>
            <div className="rounded-3xl relative w-[85px] self-start mb-2  border border-black 
                         h-[250px] bg-whiteBoard-one flex flex-col">

                <button ref={pen4Butt} className={`pen4 border
                            relative w-fit h-fit  rotate-90 top-1 right-4 ${prevClass.current?.pen4Class ? prevClass.current?.pen4Class : null}`}>
                    <img className="  w-16  " src={isDarkMode() === "light" ? '/icons/pen4f.png' :
                        isDarkMode() === "dark" ? '/icons/pen4fLight.png' : null}></img>
                </button>
                <button ref={pen5Butt} className={`pen5 border relative w-fit h-fit  rotate-90 
                            right-5
                            bottom-20 ${prevClass.current?.pen5Class ? prevClass.current?.pen5Class : null}`}>
                    <img className="  w-16  " src={isDarkMode() === "light" ? "/icons/pen5f.png" :
                        isDarkMode() === "dark" ? '/icons/pen5fLight.png' : null
                    }></img>
                </button>
                <button ref={eraserButt} className={`eraser border absolute w-[130px] h-fit 
                            right-5
                            bottom-16 ${prevClass.current?.eraserClass ? prevClass.current?.eraserClass : null}`}>
                    <img className="w-[130px]  " src={isDarkMode() === "light" ? "/icons/newEraserDark.png" :
                        isDarkMode() === "dark" ? '/icons/newEraserLight.png' : null
                    }></img>
                </button>


            </div>
        </>
    );
}




function SubPanelContent({ index }) {
    const heighLight = useRef({ previousHeighLight: 0 })
    const [giveLight, setLight] = useState([true]);
    const { selectedItem } = useContext(CommonContext);

    const prevClass = useRef(null);

    const pen4Butt = useRef(null);
    const pen5Butt = useRef(null);
    const eraserButt = useRef(null);
    const buttOnBool = useRef(0);

    function handleColor(val, index) {
        console.log('color for pen selected is  : ', val);
        let newOne = giveLight.slice();

        if (heighLight.current.previousHeighLight >= 0) {       //check if previous heightLight, if then remove , set to false.
            console.log('the previous HeighLight is : ', heighLight.current.previousHeighLight);
            newOne[heighLight.current.previousHeighLight] = false;
        }
        newOne[index] = true;

        setLight(newOne);

        heighLight.current.previousHeighLight = index;  //set previous index for heightLight
        selectedItem.pen.penStyle(null, val);
    }

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
                border border-amber-800 self-start overflow-y-auto   ">
                    <div className=" w-3 z-[1]  bg-lightPanle dark:bg-darkPanle">

                    </div>
                    <div className=" w-full grow mt-2 mb-2  flex flex-col items-between max-w-[250px]
                 self-start  h-[500px]">

                        <Sticks pen4Butt={pen4Butt} pen5Butt={pen5Butt} eraserButt={eraserButt} buttOnBool={buttOnBool} prevClass={prevClass} />
                        <Button_Eraser />
                        <Button_DrawWidth />
                        <Button_DrawColor giveLight={giveLight} handleColor={handleColor} />
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