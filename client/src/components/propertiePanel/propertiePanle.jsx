import "../../cssAnimations/propertiesPanel.css"
import "./propertiePanel.css"
import { useRef, useState, useEffect, useContext } from "react";
import { CommonContext } from "../../myLib/commonContext/myContext";
import { SketchPicker } from "react-color";
import { LocalContext } from "./localContext"


function ColorButton({ hex, setColor, transparent, heighLight, atClick }) {
    return (
        <>
            {transparent ?
                <button
                    className="size-9  rounded-full m-1 overflow-hidden"
                    onClick={() => {
                        if (atClick) {
                            atClick('transparent');
                        }
                        console.log("the color selected is : ", 'transparent');
                    }}>
                    <img className="w-full scale-[250%]" src="./icons/transparent.jpg"></img>
                </button>
                :
                <button style={{
                    backgroundColor: hex,
                    border: 'px solid',
                    borderColor: heighLight ? 'black' : 'transparent'
                }}
                    className="size-9 rounded-full m-1"
                    onClick={() => {
                        if (atClick) {
                            atClick(hex);
                        }
                        console.log("the color selected is : ", hex);
                    }}>

                </button>
            }
        </>
    );
}

const EffectOn = ({ index, effectAt, handleEffectOn, asDefault }) => {
    const [bgColor, setBgColor] = useState('transparent');

    function removeBackground() {
        setBgColor('transparent');
    }

    function setBackground() {
        if (localStorage.getItem('screenMode') === 'light') {
            setBgColor('var(--darkPanle)');
        } else if (localStorage.getItem('screenMode') === 'dark') {
            setBgColor('var(--lightPanle)');
        }
    }

    useEffect(() => {
        if (asDefault) {
            setBackground();
            handleEffectOn(index, removeBackground, effectAt, setBackground);
        }
    }, [])
    return (

        <button style={{
            backgroundColor: bgColor
        }}
            onClick={() => {
                setBackground();
                handleEffectOn(index, removeBackground, effectAt, setBackground);
            }}
            className="m-1 p-1 rounded-sm flex flex-row justify-center items-center  size-11">

            {effectAt === 'bodyColor' ?
                <div className="size-8 rounded-md bg-pink-600">
                </div>
                :
                <div className="size-8 rounded-md border-2 border-pink-600">
                </div>
            }

        </button>

    );

}



function Colors({ functionToPerform }) {

    const effectOn = useRef(null);
    const prevEffectOn = useRef({ index: null, removeFunction: null, on: null });
    const { setScreenCallbacks } = useContext(LocalContext);


    function handleColor(val) {
        functionToPerform(val, effectOn.current);
    }



    function toogleEffectOn(index, removeFunction, effectOnName, on) {
        effectOn.current = effectOnName;

        if (index !== prevEffectOn.current.index) {
            if (prevEffectOn.current.index)
                prevEffectOn.current.removeFunction();

            prevEffectOn.current.index = index;
            prevEffectOn.current.on = on;
            prevEffectOn.current.removeFunction = removeFunction;

        }
    }

    useEffect(() => {
        const runPrevEffectOn = () => {
            if (prevEffectOn.current.index) {
                prevEffectOn.current.on();
            }
        }

        setScreenCallbacks(1, runPrevEffectOn);

    }, [])



    return (
        <>
            <span className="text-2xl font-bold dark:text-whiteBoard-one text-screenModeButton">
                Colors :
            </span>
            <div className="m-1 flex flex-row justify-center">
                <EffectOn index={1} asDefault effectAt={'borderColor'} handleEffectOn={toogleEffectOn} />
                <EffectOn index={2} effectAt={'bodyColor'} handleEffectOn={toogleEffectOn} />

            </div>
            <span className="text-1xl ml-1 font-bold dark:text-whiteBoard-one text-screenModeButton self-start">
                Default Colors
            </span>
            <div className="flex flex-row flex-wrap ">
                <ColorButton heighLight hex={'#ff5757'} atClick={handleColor} />
                <ColorButton hex={'#ff66c4'} atClick={handleColor} />
                <ColorButton hex={'#cb6ce6'} atClick={handleColor} />
                <ColorButton hex={'#5e17eb'} atClick={handleColor} />
                <ColorButton hex={'#0097b2'} atClick={handleColor} />
                <ColorButton hex={'#0cc0df'} atClick={handleColor} />
                <ColorButton hex={'#7ed957'} atClick={handleColor} />
                <ColorButton hex={'#ffbd59'} atClick={handleColor} />
                <ColorButton hex={'#ff914d'} atClick={handleColor} />
                <ColorButton hex={'#000000'} atClick={handleColor} />
                <ColorButton hex={'#545454'} atClick={handleColor} />
                <ColorButton hex={'#a6a6a6'} atClick={handleColor} />
                <ColorButton hex={'#d9d9d9'} atClick={handleColor} />
                <ColorButton transparent atClick={handleColor} />


            </div>
            <div>

            </div>
        </>
    );
}

function Border({ type, functionToPerform, currentProperties }) {

    const [inputData, setInputData] = useState({ borderWidth: null, borderRadius: null });

    function setBorderRadius(val) {
        setInputData((prev) => {
            prev = { ...prev, borderRadius: val }
            console.log('the prev from setBorderWidth : ', prev);
            return prev;
        })
        functionToPerform(val, 'borderRadius');
    }
    function setBorderWidth(val) {
        setInputData((prev) => {
            prev = { ...prev, borderWidth: val }
            console.log('the prev from setBorderWidth : ', prev);
            return prev;
        })
        functionToPerform(val, 'borderWidth');
    }

    useEffect(() => {
        //console.log('the input data : ', inputData);
    }, [inputData]);

    return (
        <>
            <span className="text-2xl dark:text-whiteBoard-one text-screenModeButton">
                Border :
            </span>
            <div className="border border-amber-300 flex flex-col justify-between p-1 w-full">
                <TheInput prevValue={currentProperties ? currentProperties.borderWidth : null} name={'Border Width'} outValueFunction={setBorderWidth} />

                {type === 'square' || type === 'rectangle' ?
                    <TheInput prevValue={currentProperties ? currentProperties.borderRadius : null} name={'Border Radius'} outValueFunction={setBorderRadius} />
                    : null}
            </div>
        </>
    );
}

function Position({ type, functionToPerform, currentProperties }) {

    const [inputData, setInputData] = useState({ height: null, width: null, x: null, y: null, radius: null, side: null, rx: null, ry: null });

    const bindedFunctions = {
        setHeight: setData.bind(null, 'height'),
        setWidth: setData.bind(null, 'width'),
        setX: setData.bind(null, 'x'),
        setY: setData.bind(null, 'y'),
        setRadius: setData.bind(null, 'radius'),
        setSide: setData.bind(null, 'side'),
        setRx: setData.bind(null, 'width'),
        setRy: setData.bind(null, 'height'),
    }

    function setData(dataOf, val) {

        if (dataOf === 'height') {
            setInputData((prev) => {
                prev = { ...prev, height: val }
                console.log('the prev from setData : ', prev);
                return prev;
            })
            functionToPerform(val, dataOf);
        }
        else if (dataOf === 'width') {
            setInputData((prev) => {
                prev = { ...prev, width: val }
                console.log('the prev from setData : ', prev);
                return prev;
            })
            functionToPerform(val, dataOf);
        }
        else if (dataOf === 'side') {
            setInputData((prev) => {
                prev = { ...prev, side: val }
                console.log('the prev from setData : ', prev);
                return prev;
            })
            functionToPerform(val, dataOf);
        }
        else if (dataOf === 'radius') {
            setInputData((prev) => {
                prev = { ...prev, radius: val }
                console.log('the prev from setData : ', prev);
                return prev;
            })
            functionToPerform(val, dataOf);
        }
        else if (dataOf === 'x') {
            setInputData((prev) => {
                prev = { ...prev, x: val }
                console.log('the prev from setData : ', prev);
                return prev;
            })
        }
        else if (dataOf === 'y') {
            setInputData((prev) => {
                prev = { ...prev, y: val }
                console.log('the prev from setData : ', prev);
                return prev;
            })
        }


    }

    return (
        <>
            <span className="text-2xl dark:text-whiteBoard-one text-screenModeButton">
                Position :
            </span>
            <div className="border border-amber-300 flex flex-row flex-wrap justify-between p-1 w-full">

                {type === 'rectangle' || type === 'triangle' ?
                    <>
                        <TheInput prevValue={type === 'triangle' ? currentProperties.triangleWidth : currentProperties.width} name={'Width'} outValueFunction={bindedFunctions.setWidth} />
                        <TheInput prevValue={type === 'triangle' ? currentProperties.triangleHeight : currentProperties.height} name={'Height'} outValueFunction={bindedFunctions.setHeight} />
                    </>
                    : null}

                {type === 'circle' ?
                    <>
                        <TheInput prevValue={currentProperties.r} name={'Radius'} outValueFunction={bindedFunctions.setRadius} />
                    </>
                    : null}

                {type === 'square' ?
                    <>
                        <TheInput prevValue={currentProperties.width} name={'Side'} outValueFunction={bindedFunctions.setSide} />
                    </>
                    : null}

                {type === 'ellipse' ?
                    <>
                        <TheInput prevValue={currentProperties.rx} name={'Width'} outValueFunction={bindedFunctions.setRx} />
                        <TheInput prevValue={currentProperties.ry} name={'Height'} outValueFunction={bindedFunctions.setRy} />
                    </>
                    : null}

                <TheInput name={'X'} outValueFunction={bindedFunctions.setX} />
                <TheInput name={'Y'} outValueFunction={bindedFunctions.setY} />
            </div>
        </>
    );
}



function TheInput({ name, inputName, outValueFunction, prevValue }) {
    function handleOnChange(e) {
        outValueFunction(e.target.value);
    }
    return (
        <>
            <div className="m-1  text-screenModeButton  dark:text-whiteBoard-one ">
                <span className="dark:text-whiteBoard-one text-screenModeButton">
                    <span className="font-bold">{name}</span> -px
                </span><br></br>


                <input value={prevValue ? parseFloat(prevValue) : 0}
                    onChange={(e) => {
                        handleOnChange(e);
                    }} className=" removeArrow border border-screenModeButton dark:border-whiteBoard-one p-1 
                w-20 rounded-sm" type="number">
                </input>

            </div>
        </>
    );
}


function PropertiesPanel({ out_Functionality }) {

    const pPanelRef = useRef(null);
    const [fromSelector, setFromSelector] = useState({ type: null });
    const [elemProperties, setElemProperties] = useState(null);
    const { aCommunication } = useContext(CommonContext);
    const callBacksOnScreenToogle = useRef([null]);

    function setScreenCallbacks(index, callback) {
        callBacksOnScreenToogle.current[index] = { index: index, callback: callback };
    }

    function runOnToggleScreenMode(val) {
        callBacksOnScreenToogle.current.forEach((item) => {
            if (item?.index) {
                item.callback();
            }
        })
        //console.log("from pPanel the screen  mode is  :", val);
    }

    function operation(val, dataOf) {
        console.log('from opertation we have :', val, dataOf);

        if (val.length < 1) {
            val = 'zero';
        } else if (dataOf === 'bodyColor' || dataOf === 'borderColor') {

        }
        else {
            val = parseFloat(val);
        }

        switch (dataOf) {
            case "width": {
                aCommunication.current.theSelector.widthModification(val);
                break;
            }
            case "side": {
                aCommunication.current.theSelector.dotModification(val);
                break;
            }
            case 'height': {
                aCommunication.current.theSelector.heightModification(val);
                break;
            }
            case 'radius': {
                aCommunication.current.theSelector.dotModification(val);
                break;
            }
            case 'borderWidth': {
                aCommunication.current.theSelector.borderModification('strokeWidth', { strokeWidth: val });
                break;
            }
            case 'borderRadius': {
                aCommunication.current.theSelector.borderModification('radius', { radius: val });
                break;
            }
            case 'borderColor': {
                // aCommunication.current.theSelector.borderModification('radius', { radius: val });
                aCommunication.current.theSelector.colorModification(val, dataOf);
                break;
            }
            case 'bodyColor': {
                aCommunication.current.theSelector.colorModification(val, dataOf);
                break;
            }
        }

    }


    function on() {
        pPanelRef.current.classList.add('pPanleActive');
    }
    function off() {
        pPanelRef.current.classList.remove('pPanleActive');
    }
    function contains() {
        if (pPanelRef.current.classList.contains('pPanleActive')) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        //console.log('the properties of the elem : ', elemProperties);

    }, [elemProperties])

    useEffect(() => {
        aCommunication.current.setFromSelector = setFromSelector;
        aCommunication.current.pPanel = {
            on: on, off: off, setProperties: setElemProperties
        };
        aCommunication.current.sendTo_pPanel = runOnToggleScreenMode;


        // console.log('the communication from the pPanel', aCommunication);
    }, [])

    useEffect(() => {
        if (out_Functionality) {
            out_Functionality({ on: on, off: off, contains: contains });
        }
    }, [out_Functionality])

    return (
        <>

            <div ref={pPanelRef} className="pPanle border border-amber-700 bottom-0 
            absolute self-start grow bg-lightPanle mt-1 h-full  w-[30vw] overflow-y-auto
            min-w-[250px] max-w-[300px] rounded-tr-md dark:bg-darkPanle p-1
              flex flex-col items-center overflow-hidden pt-2 pb-2 z-[4] "
                onClick={(e) => {
                    e.stopPropagation();
                }}>

                i am prop panel
                <LocalContext.Provider value={{ setScreenCallbacks }}>

                    <Position type={fromSelector.type} functionToPerform={operation} currentProperties={elemProperties} /><br />
                    <Colors functionToPerform={operation} /><br />
                    <Border currentProperties={elemProperties} functionToPerform={operation} type={fromSelector.type} />
                </LocalContext.Provider>
            </div>

        </>
    );
}






export { PropertiesPanel }