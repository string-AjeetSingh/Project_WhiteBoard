
import { useEffect, useState, useRef, useContext } from "react";
import { handleScroll, mouseEvent, otherEventHandle, resetHandles } from "../../utilities/whiteBoard.Utilities";
import { useHoldKey } from "../../hooks/holdKeys";
import { useWhiteboardEvents } from "../../hooks/useWhiteBoardEffects";
import { CommonContext } from "../../myLib/commonContext/myContext";
import { SelectorContext } from "./selectorContext";
import { Selector } from "../selector/selector";
import { useDraw } from "../../hooks/draw";
import useSaveData from "../../hooks/saveData";



function Content({ SvgArray, canvasArray, roughCanvas }) {
    return (
        <>
            {SvgArray}
            {canvasArray}
            {roughCanvas}
        </>
    );
}

function WhiteBoard({ }) {
    const divelem = useRef(null);
    const innerDiv = useRef(null);
    const scrollControlBool = useRef(false);
    const middleMouseBool = useRef(false);
    const mousePoinerPostion = useRef([null, null]);
    const scrollPostion = useRef([null, null]);
    const ctrlHold = useHoldKey(innerDiv, 'Control');
    const prevScale = useRef(200);
    const defaultScaleValue = useRef(100);
    const [whiteBoardColor, setWhiteBoardColor] = useState('var(--whiteBoard-one)');


    const { selectedItem, aCommunication, trackEvent } = useContext(CommonContext);
    const [SvgArray, setSvgArray] = useState([
        <svg width={500} height={500} className="absolute" style={{
            border: '1px solid black'
        }}>
            <rect key={1} x="50" y="50" width="100" height="100" fill="red" stroke="black" />
            <circle key={2} cx="250" cy="100" r="50" fill="blue" stroke="black" />
            <ellipse key={3} cx="400" cy="100" rx="80" ry="40" fill="green" stroke="black" />
            <line key={4} x1="50" y1="200" x2="450" y2="200" stroke="black" strokeWidth="2" />
            <polygon key={5} points="200,250 250,300 150,300" fill="purple" stroke="black" />
            <polyline key={6} points="100,400 150,450 200,400" fill="none" stroke="black" strokeWidth="2" />
        </svg>

    ]);
    const [canvasArray, setCanvasArray] = useState([]);
    const [roughCanvas, setRoughCanvas] = useState(null);
    const theSelector = useRef({});

    const totalScrollPossible = [300, 100];

    //Control Draw Working Of Pens 
    const { provideCanvas, selectPenStyle, getPenStyle, setPenStyleCallback } = useDraw(innerDiv, setCanvasArray, setRoughCanvas, prevScale);

    const bindedFunction = {
        handleScroll: handleScroll.bind(null, scrollControlBool, innerDiv, divelem),
        mouseMiddleDown: mouseEvent.middleDown.bind(null, middleMouseBool, mousePoinerPostion, scrollPostion, divelem),
        mouseMiddleUp: mouseEvent.middleUp.bind(null, middleMouseBool),
        mouseMove: mouseEvent.move.bind(null, middleMouseBool, mousePoinerPostion, scrollPostion, divelem),
        mouseLeave: mouseEvent.leave.bind(null, middleMouseBool),
        preventMouseZoom: otherEventHandle.preventZoomOnCtrl.bind(null, innerDiv),
        resumeMouseZoom: otherEventHandle.resumeZoomOnCtrl.bind(null, innerDiv),
        wheelZoom: mouseEvent.wheelZoom.bind(null, ctrlHold, prevScale, innerDiv, totalScrollPossible),
        mouseDown: mouseEvent.down.bind(null, selectedItem),
        createShape: otherEventHandle.engageItem.bind(null, selectedItem, innerDiv, prevScale, defaultScaleValue, { setSvgArray: setSvgArray, setPen: provideCanvas }, aCommunication),
        trackInnerDivMouseUp: trackEvent.bind(null, 'innerDiv', 'mouseup', null),
        trackInnerDivMouseDown: trackEvent.bind(null, 'innerDiv', 'mousedown', null),
        trackInnerDivMouseLeave: trackEvent.bind(null, 'innerDiv', 'mouseleave', null),

    }

    useWhiteboardEvents(innerDiv, divelem, bindedFunction);
    useSaveData();


    useEffect(() => {

        //Provide Functionalities to communication
        selectedItem.pen = { penStyle: selectPenStyle, setPenStyleCallback };

        //Starting of a index  system that sustain the 
        // global indexes of the whiteboard elems and functions to control it
        aCommunication.current.globalIndex = {
            value: 0, getNewIndex: () => {
                let newIndex = aCommunication.current.globalIndex.value + 1;
                aCommunication.current.globalIndex.value = newIndex;
                return newIndex;
            }
        }

        //A place to store the data of whiteboard and 
        // its functions from controlData.utils
        aCommunication.current.whiteboardData = {
            //the "data" in this scope is initialized by the next effect on getting the server data.
            setData: (keyObj, value, index, level) => {
                if (level === 1) {
                    if (!aCommunication.current.whiteboardData.data[index]?.[keyObj.one]) throw new Error('undefined properties from setData of whiteboardData function');
                    aCommunication.current.whiteboardData.data[index][keyObj.one] = value;
                } else if (level === 2) {
                    if (!aCommunication.current.whiteboardData.data[index]?.[keyObj.one]?.[keyObj.two]) throw new Error('undefined properties from setData of whiteboardData function');
                    aCommunication.current.whiteboardData.data[index][keyObj.one][keyObj.two] = value;
                } else {
                    throw new Error('please provide valid level for setData whiteboardData function');
                }
            },
            resetWhiteboard: resetHandles.reset.bind(null, aCommunication, setSvgArray, setCanvasArray),
            recoverWhiteboard: resetHandles.recovery.bind(null, aCommunication, setSvgArray, setCanvasArray)

        }

        aCommunication.current.whiteBoard = {
            setColor: (name) => {
                otherEventHandle.setWhiteBoardColor(name, setWhiteBoardColor);
            }
        }
    }, [])

    useEffect(() => { //Some work when serverData is ready from the parent workspace
        let interval = setInterval(() => {
            if (aCommunication.current.whiteBoardServerData?.ready) {
                clearInterval(interval);
                let serverData = aCommunication.current.whiteBoardServerData.data;
                aCommunication.current.whiteboardData.data = serverData.data ? serverData.data : [];

                if (serverData.data)
                    aCommunication.current.globalIndex.value = serverData.data[serverData.data.length - 1].index;

                aCommunication.current.whiteboardData.recoverWhiteboard();
            }
        }, 0);
        return (() => {
            if (interval) {
                clearInterval(interval);
            }

            if (aCommunication.current.whiteboardData.data)
                aCommunication.current.whiteboardData.data = null;
        })
    }, [])
    return (
        <>
            <div ref={divelem} className="  h-full overflow-scroll 
             border-2 border-amber-600 rounded-2xl 
              relative "
            >
                <div style={{
                    transformOrigin: "top left",
                    transform: `scale(${prevScale.current}%)`,
                    backgroundColor: whiteBoardColor

                }}
                    ref={innerDiv} className=" h-[1000px] 
                 text-black w-[1000px] absolute text-center "
                >
                    <SelectorContext.Provider value={{ theSelector, innerDiv, prevScale }}>

                        <Content SvgArray={SvgArray} canvasArray={canvasArray} roughCanvas={roughCanvas} />
                        <Selector />

                    </SelectorContext.Provider>

                </div>
            </div>


        </>
    );
}


export { WhiteBoard }