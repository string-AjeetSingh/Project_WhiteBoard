import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { useInnerWidthHeight } from "../../hooks/InnerWidthHeight";
import { FunctionContext, VariableContext } from "./localContext";
import { CommonContext } from "../../myLib/commonContext/myContext";
import { useIsTouch } from "../../hooks/isTouch";
import { addEvent, removeEvent } from "../../utils/addRemoveEvent.js"
import { SubPanelContent } from "./mainContainer.leftSpace.subPanelContents.jsx";





function TP_Button({ theName, theSrc, index, i_am_using_context }) {
    const { trackEvent, eventDetail } = useContext(CommonContext);
    const divimg = useRef(null);
    let isTouch = useIsTouch(divimg);

    const { subPanelOperation } = useContext(FunctionContext);

    function handleMouseEnter(event) {
        trackEvent("TP_Button", "mouseenter", index);
        event.stopImmediatePropagation();

        subPanelOperation({ name: theName, status: 1 });
    }

    function handleMouseLeave(event) {
        trackEvent("TP_Button", "mouseleave", index);
        //subPanelOperation({ name: theName, status: 0 });
    }

    function handleTouch(event) {
        trackEvent("TP_Button", "touchstart", index);
        subPanelOperation({ name: theName, status: 1 });
    }


    //console.log('isTouch ; ', isTouch);



    useEffect(() => {
        if (divimg.current) {
            if (isTouch === 1) {
                divimg.current.addEventListener('touchstart', handleTouch);

            } else if (isTouch === -1) {
                console.log('it will be touch ');

                divimg.current.addEventListener("mouseenter", handleMouseEnter);

                divimg.current.addEventListener("mouseleave", handleMouseLeave);
            }
        }

        return (() => {
            if (divimg.current) {
                if (isTouch === 1) {
                    divimg.current.removeEventListener('touchstart', handleTouch);
                } else if (isTouch === -1) {
                    divimg.current.removeEventListener("mouseenter", handleMouseEnter);
                    divimg.current.removeEventListener("mouseleave", handleMouseLeave);
                }
            }
        })

    }, [divimg, isTouch])


    return (
        <>
            <button className="toolPanelButt mt-2 h-fit w-16 flex flex-col 
            items-center 
            justify-center p-1">
                <div ref={divimg} className="bg-lightPanle flex flex-col items-center
                 toolPanelButt_img rounded-md
                 p-1 size-14">
                    <img className="w-full " src={theSrc} alt="img"></img>
                </div>
                <span style={{
                    wordBreak: "break-word",
                    lineHeight: 1
                }} className=" dark:text-white text-[0.9rem] ">{theName}</span>
            </button>
        </>
    );
}

function ToolPanel({ height, func_outProperties, i_am_using_context }) {
    const toolPanel = useRef(null);
    const { trackEvent } = useContext(CommonContext);
    const { getSubPanelProperties } = useContext(FunctionContext);
    const toolPanelDiv = useRef(null);

    function on() {
        toolPanel.current.classList.add('toolPanelActive');
    }
    function off() {
        toolPanel.current.classList.remove('toolPanelActive');

    }
    function handleMouseEnterTrack(event) {
        event.stopPropagation();
        trackEvent('ToolPanel', 'mouseenter');
    }

    useEffect(() => {
        if (func_outProperties) {
            if (toolPanel.current) {
                func_outProperties({ on: on, off: off });
            }
        }
    }, [func_outProperties, toolPanel.current])

    useEffect(() => {
        if (toolPanelDiv.current) {
            toolPanelDiv.current.addEventListener('mouseenter', handleMouseEnterTrack);
        }
        return () => {
            if (toolPanelDiv.current) {
                toolPanelDiv.current.removeEventListener('mouseenter', handleMouseEnterTrack);
            }
        }

    }, [toolPanelDiv])

    return (
        <>
            <div ref={toolPanelDiv} className={` grow flex flex-col  self-start relative  `}>
                <div ref={toolPanel} className="toolPanel self-start
            relative grow bg-darkPanle w-[90px]  z-[5] rounded-tr-md
             border-white flex flex-col items-center ">

                    <div className="flex flex-col items-center grow ">
                        <TP_Button index={1} theSrc={"/icons/shapes.png"} theName={"Shapes"} />
                        <TP_Button index={2} theSrc={"/icons/pens.png"} theName={"Draw"} />
                        <TP_Button index={3} theSrc={"/icons/background.png"} theName={"Back Ground"} />
                    </div>

                </div>

                <ToolSubPanel func_outProperties={getSubPanelProperties} />
            </div>
        </>
    );
}

function ToolSubPanel({ func_outProperties, i_am_using_context }) {
    const toolSubPanel = useRef(null);
    const { trackEvent, eventDetail } = useContext(CommonContext);
    const { subPanelIsOn } = useContext(VariableContext);
    const [content, setContent] = useState(null);

    function on() {
        toolSubPanel.current.classList.add('toolSubPanelActive');
        subPanelIsOn.current = true;
    }
    function off() {
        toolSubPanel.current.classList.remove('toolSubPanelActive');
        subPanelIsOn.current = false;

    }

    function handleMouseEnter(event) {
        event.stopImmediatePropagation();
        trackEvent('ToolPanel', "mouseenter");
    }

    useEffect(() => {
        if (func_outProperties) {
            if (toolSubPanel.current) {
                func_outProperties({ on: on, off: off, setContent: setContent });
            }
        }
    }, [func_outProperties, toolSubPanel.current])

    useEffect(() => {
        if (toolSubPanel.current) {
            toolSubPanel.current.addEventListener('mouseenter', handleMouseEnter);
        }

        return () => {
            if (toolSubPanel.current) {
                toolSubPanel.current.removeEventListener('mouseenter', handleMouseEnter);
            }
        }

    }, [toolSubPanel])

    return (
        <>
            <div ref={toolSubPanel}

                className=" toolSubPanel border border-amber-700 bottom-0 
            absolute self-start grow bg-darkPanle mt-1 h-full  w-[30vw]
            min-w-[250px] max-w-[500px] rounded-tr-md
              flex flex-col items-center overflow-hidden p-2 pl-3">
                {content}
            </div>
        </>
    );
}

function LeftSpace({ }) {
    let [width, height] = useInnerWidthHeight();
    const [panelBool, setPanelBool] = useState(0);
    const subPanelIsOn = useRef(false);
    const toolButt = useRef(null);
    const panelPropertise = useRef({ on: null, off: null });
    const subPanelPropertise = useRef({ on: null, off: null });
    const { trackEvent, eventDetail } = useContext(CommonContext);
    const leftSpaceElem = useRef(null);


    function getPanelProperties(got) {
        panelPropertise.current.on = got.on;
        panelPropertise.current.off = got.off;
    }
    const getSubPanelProperties = useCallback((got) => {
        subPanelPropertise.current.on = got.on;
        subPanelPropertise.current.off = got.off;
        subPanelPropertise.current.setContent = got.setContent;

    }, []);
    const subPanelOperation = useCallback((got) => {
        console.log("opeartion fouund : ", got);
        if (got.status === 1) {
            subPanelPropertise.current.on();
            switch (got.name) {
                case "Shapes": {
                    if (subPanelPropertise.current.setContent) {
                        subPanelPropertise.current.setContent(<SubPanelContent index={1} />)
                    }
                    break;
                }
                case "Draw": {
                    if (subPanelPropertise.current.setContent) {
                        subPanelPropertise.current.setContent(<SubPanelContent index={2} />)
                    }
                    break;
                }
                case "Back Ground": {
                    if (subPanelPropertise.current.setContent) {
                        subPanelPropertise.current.setContent(<SubPanelContent index={3} />)
                    }
                    break;
                }

            }
        } else if (got.status === "terminate") {
            subPanelPropertise.current.off();
        }
        else {
            subPanelPropertise.current.off();
        }

        // console.log('subpanelIsON : ', subPanelIsOn.current);
    }, []);


    function tooglePanel() {
        panelBool === 1 ? setPanelBool(-1) : setPanelBool(1);
    }

    function handleMouseEnterTrack(event) {
        event.stopPropagation();
        trackEvent("LeftSpace", "mouseenter");
    }
    function handleMouseOverTrack(event) {
        event.stopPropagation();
        trackEvent("LeftSpace", "mouseover");
    }
    function handleMouseEnterTrackToolButt(event) {
        event.stopPropagation();
        trackEvent("toolButton", "mouseenter");
    }

    useEffect(() => {
        if (toolButt.current) {
            addEvent(toolButt, "mouseenter", handleMouseEnterTrackToolButt);
        }
        return () => {
            if (toolButt.current) {
                removeEvent(toolButt, "mouseenter", handleMouseEnterTrackToolButt);
            }
        }

    }, [toolButt])

    useEffect(() => {
        if (leftSpaceElem.current) {
            leftSpaceElem.current.addEventListener("mouseenter", handleMouseEnterTrack);
            // leftSpaceElem.current.addEventListener("mouseover", handleMouseOverTrack);
        }
        return () => {
            if (leftSpaceElem.current) {
                leftSpaceElem.current.removeEventListener("mouseenter", handleMouseEnterTrack);
                // leftSpaceElem.current.removeEventListener("mouseover", handleMouseOverTrack);

            }
        }

    }, [leftSpaceElem])

    useEffect(() => {
        if (panelBool === 1) {
            panelPropertise.current.on();

        } else if (panelBool === -1) {
            panelPropertise.current.off();
        }
    }, [panelBool])


    useEffect(() => {
        // console.log('the event is : ', eventDetail);


        if (subPanelIsOn.current) {
            if (eventDetail.name === "NavBar" && eventDetail.type === "mouseenter") {
                subPanelOperation({ status: "terminate" });
            }
            else if (eventDetail.name === "RightSpace" && eventDetail.type === "mouseenter") {
                subPanelOperation({ status: "terminate" });
            }
            else if (eventDetail.name === "toolButton" && eventDetail.type === "mouseenter") {
                subPanelOperation({ status: "terminate" });
            }
        }

    }, [eventDetail])

    return (
        <>
            <div ref={leftSpaceElem} className="basis-[10%] min-w-[60px] max-w-[65px]
            flex flex-col items-center">

                <button onClick={tooglePanel} ref={toolButt} className=" toolButt 
                size-10 rounded-sm mt-2 m-1 
                 bg-darkPanle dark:bg-lightPanle">
                </button>


                <VariableContext.Provider value={{ subPanelIsOn }}>
                    <FunctionContext.Provider value={{ subPanelOperation, getSubPanelProperties }}>


                        <ToolPanel func_outProperties={getPanelProperties} />


                    </FunctionContext.Provider>
                </VariableContext.Provider>



            </div>
        </>
    );
}


export { LeftSpace }