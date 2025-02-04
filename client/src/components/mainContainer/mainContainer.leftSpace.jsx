import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { useInnerWidthHeight } from "../../hooks/InnerWidthHeight";
import { FunctionContext, VariableContext } from "./localContext";




function TP_Button({ theName, theSrc }) {
    const divimg = useRef(null);

    const { subPanelOperation } = useContext(FunctionContext);

    function handleMouseEnter(event) {
        event.stopImmediatePropagation();
        subPanelOperation({ name: theName, status: 1 });
    }

    function handleMouseLeave(event) {
        subPanelOperation({ name: theName, status: 0 });

    }


    useEffect(() => {
        divimg.current.addEventListener("mouseenter", handleMouseEnter);

        divimg.current.addEventListener("mouseleave", handleMouseLeave);

        return (() => {
            divimg.current.removeEventListener("mouseenter", handleMouseEnter);
            divimg.current.removeEventListener("mouseleave", handleMouseLeave);
        })

    }, [divimg])


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

function ToolPanel({ height, func_outProperties }) {
    const toolPanel = useRef(null);

    function on() {
        toolPanel.current.classList.add('toolPanelActive');
    }
    function off() {
        toolPanel.current.classList.remove('toolPanelActive');

    }

    useEffect(() => {
        if (func_outProperties) {
            if (toolPanel.current) {
                func_outProperties({ on: on, off: off });
            }
        }
    }, [func_outProperties, toolPanel.current])

    return (
        <>
            <div ref={toolPanel} className={`toolPanel  z-[3]
            relative self-start grow bg-darkPanle w-[90px] mt-1 border
             border-white flex flex-col items-center  `}>
                <div className="flex flex-col items-center grow">
                    <TP_Button theSrc={"/icons/shapes.png"} theName={"Shapes"} />
                    <TP_Button theSrc={"/icons/pens.png"} theName={"Draw"} />
                    <TP_Button theSrc={"/icons/background.png"} theName={"Back Ground"} />
                </div>
            </div>
        </>
    );
}

function ToolSubPanel({ func_outProperties }) {
    const toolSubPanel = useRef(null);

    function on() {
        toolSubPanel.current.classList.add('toolSubPanelActive');
    }
    function off() {
        toolSubPanel.current.classList.remove('toolSubPanelActive');

    }
    useEffect(() => {
        if (func_outProperties) {
            if (toolSubPanel.current) {
                func_outProperties({ on: on, off: off });
            }
        }
    }, [func_outProperties, toolSubPanel.current])

    return (
        <>
            <div ref={toolSubPanel}

                className=" toolSubPanel border border-amber-500 bottom-2  
            absolute self-start grow bg-darkPanle mt-1 h-[82%] z-[2] w-[70vw]
            min-w-[300px] max-w-[500px]
              flex flex-col items-center  ">

            </div>
        </>
    );
}

function LeftSpace({ }) {
    let [width, height] = useInnerWidthHeight();
    const [panelBool, setPanelBool] = useState(0);
    const toolButt = useRef(null);
    const panelPropertise = useRef({ on: null, off: null });
    const subPanelPropertise = useRef({ on: null, off: null });


    function getPanelProperties(got) {
        panelPropertise.current.on = got.on;
        panelPropertise.current.off = got.off;
    }
    function getSubPanelProperties(got) {
        subPanelPropertise.current.on = got.on;
        subPanelPropertise.current.off = got.off;

    }
    const subPanelOperation = useCallback((got) => {
        console.log("opeartion fouund : ", got);
        if (got.status) {
            subPanelPropertise.current.on();
        } else {
            subPanelPropertise.current.off();

        }
    }, []);


    function tooglePanel() {
        panelBool === 1 ? setPanelBool(-1) : setPanelBool(1);
    }

    useEffect(() => {
        if (panelBool === 1) {
            panelPropertise.current.on();

        } else if (panelBool === -1) {
            panelPropertise.current.off();
        }
    }, [panelBool])

    return (
        <>
            <div className="basis-[10%] border min-w-[60px] max-w-[65px]
            flex flex-col items-center">

                <button onClick={tooglePanel} ref={toolButt} className=" toolButt size-10 rounded-sm mt-2 m-1
                 bg-darkPanle dark:bg-lightPanle">
                </button>

                <VariableContext.Provider>
                    <FunctionContext.Provider value={{ subPanelOperation }}>


                        <ToolPanel func_outProperties={getPanelProperties} />
                        <ToolSubPanel func_outProperties={getSubPanelProperties} />

                    </FunctionContext.Provider>
                </VariableContext.Provider>


            </div>
        </>
    );
}


export { LeftSpace }