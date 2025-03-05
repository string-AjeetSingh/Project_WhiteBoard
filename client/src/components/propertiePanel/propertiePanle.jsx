import "../../cssAnimations/propertiesPanel.css"
import "./propertiePanel.css"
import { useRef, useState, useEffect, useContext } from "react";
import { CommonContext } from "../../myLib/commonContext/myContext";

function Colors({ }) {
    return (
        <>
            <span className="text-2xl dark:text-whiteBoard-one text-screenModeButton">
                Colors :
            </span>
        </>
    );
}

function Border({ type, functionToPerform }) {

    const [inputData, setInputData] = useState({ borderWidth: null, borderRadius: null });

    function setBorderRadius(val) {
        setInputData((prev) => {
            prev = { ...prev, borderRadius: val }
            console.log('the prev from setBorderWidth : ', prev);
            return prev;
        })
    }
    function setBorderWidth(val) {
        setInputData((prev) => {
            prev = { ...prev, borderWidth: val }
            console.log('the prev from setBorderWidth : ', prev);
            return prev;
        })
    }

    useEffect(() => {
        console.log('the input data : ', inputData);
    }, [inputData]);

    return (
        <>
            <span className="text-2xl dark:text-whiteBoard-one text-screenModeButton">
                Border :
            </span>
            <div className="border border-amber-300 flex flex-col justify-between p-1 w-full">
                <TheInput name={'Border Width'} outValueFunction={setBorderWidth} />
                <TheInput name={'Border Radius'} outValueFunction={setBorderRadius} />
            </div>
        </>
    );
}

function Position({ type, functionToPerform }) {

    const [inputData, setInputData] = useState({ height: null, width: null, x: null, y: null, radius: null, side: null, rx: null, ry: null });

    const bindedFunctions = {
        setHeight: setData.bind(null, 'height'),
        setWidth: setData.bind(null, 'width'),
        setX: setData.bind(null, 'x'),
        setY: setData.bind(null, 'y'),
        setRadius: setData.bind(null, 'radius'),
        setSide: setData.bind(null, 'side'),
        setRx: setData.bind(null, 'rx'),
        setRy: setData.bind(null, 'ry'),
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
        }
        else if (dataOf === 'radius') {
            setInputData((prev) => {
                prev = { ...prev, radius: val }
                console.log('the prev from setData : ', prev);
                return prev;
            })
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
                        <TheInput name={'Width'} outValueFunction={bindedFunctions.setWidth} />
                        <TheInput name={'Height'} outValueFunction={bindedFunctions.setHeight} />
                    </>
                    : null}

                {type === 'circle' ?
                    <>
                        <TheInput name={'Radius'} outValueFunction={bindedFunctions.setRadius} />
                    </>
                    : null}

                {type === 'square' ?
                    <>
                        <TheInput name={'Side'} outValueFunction={bindedFunctions.setSide} />
                    </>
                    : null}

                {type === 'ellipse' ?
                    <>
                        <TheInput name={'Rx'} outValueFunction={bindedFunctions.setRx} />
                        <TheInput name={'Ry'} outValueFunction={bindedFunctions.setRy} />
                    </>
                    : null}

                <TheInput name={'X'} outValueFunction={bindedFunctions.setX} />
                <TheInput name={'Y'} outValueFunction={bindedFunctions.setY} />
            </div>
        </>
    );
}



function TheInput({ name, inputName, outValueFunction }) {
    function handleOnChange(e) {
        outValueFunction(e.target.value);
    }
    return (
        <>
            <div className="m-1  text-screenModeButton  dark:text-whiteBoard-one ">
                <span className="dark:text-whiteBoard-one text-screenModeButton">
                    <span className="font-bold">{name}</span> -px
                </span><br></br>


                <input onChange={(e) => {
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
    const { aCommunication } = useContext(CommonContext);

    function operation(val, dataOf) {
        val = parseFloat(val);
        switch (dataOf) {
            case "width": {
                aCommunication.current.theSelector.widthModification(val);
                break;
            }

            case 'height': {
                aCommunication.current.theSelector.heightModification(val);
                break;
            }
        }

    }

    /* 
    
    useEffect(() => {
        
        // console.log('type at propertiesPanel is : ', fromSelector);
    }, [fromSelector])
    */

    useEffect(() => {
        aCommunication.current.setFromSelector = setFromSelector;
        aCommunication.current.pPanel = {
            on: on, off: off
        }
        // console.log('the communication from the pPanel', aCommunication);
    }, [])

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
        if (out_Functionality) {
            out_Functionality({ on: on, off: off, contains: contains });
        }
    }, [out_Functionality])

    return (
        <>

            <div ref={pPanelRef} className="pPanle border border-amber-700 bottom-0 
            absolute self-start grow bg-lightPanle mt-1 h-full  w-[30vw]
            min-w-[250px] max-w-[300px] rounded-tr-md dark:bg-darkPanle p-1
              flex flex-col items-center overflow-hidden pt-2 pb-2 z-[4] "
                onClick={(e) => {
                    e.stopPropagation();
                }}>

                i am prop panel
                <Position type={fromSelector.type} functionToPerform={operation} />
                <Colors />
                <Border type={fromSelector.type} />
            </div>

        </>
    );
}






export { PropertiesPanel }