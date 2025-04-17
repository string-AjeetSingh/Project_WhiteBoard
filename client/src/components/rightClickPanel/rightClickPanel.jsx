import { easeIn, motion, transform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useScreenMode from "../../hooks/screenMode";
import useNormalizedScale from "../../hooks/normalizedScale";
import useInverseScale from "../../hooks/inverseScale";

function ifTouch(ref, callback) {
    if (!ref.current)
        callback();
}

function Shortcuts({ children }) {
    return (
        <>
            <div className="scale-80 p-[1px] pr-1 pl-1 rounded-md  dark:bg-lightPanle bg-darkPanle">
                <span>{children}</span>
            </div>
        </>
    );
}

function Icon({ theSrc, useDefault }) {
    /*  -- old stuff
    <button className="size-5 m-1 p-[2px] group-[one]: hover:bg-lightPanle  rounded-md">
                <img className="w-full active:scale-90" src={theSrc}></img>
            </button>
     */
    const [theStyle, setStyle] = useState(null);



    useEffect(() => {

        if (useDefault) {
            setStyle({
                whileHover: { y: -3 },
                transition: { duration: 0.09 },
                whileTap: { scale: 0.9 }
            });
        }
    }, [useDefault])

    return (
        <>
            <motion.button
                {...theStyle}

                className="relative size-5 m-1 p-[2px]  hover:bg-lightPanle  rounded-md">
                <img className="w-full " src={theSrc}></img>
            </motion.button>
        </>
    );
}

function Option({ style, iconElem, name, shortcutElem, onClick }) {
    const [screenMode] = useScreenMode();

    return (
        <>
            <motion.button
                style={style ? style : null}
                onClick={() => {
                    if (onClick)
                        onClick();
                }}
                initial={{
                    backgroundColor:
                        'rgba(0,0,0,0)',
                }}
                whileHover={{
                    y: -2,
                    backgroundColor:
                        screenMode === 'light'
                            ? 'var(--color-darkPanle)'
                            : 'var(--color-lightPanle)',
                }}
                whileTap={{
                    scale: 0.9
                }}

                transition={{ duration: 0.09, ease: 'easeIn' }}
                className="relative pr-1 flex flex-row justify-between items-center dark:active:bg-lightPanle rounded-md"
            >
                <div className="flex flex-row items-center">
                    {iconElem ?? null}
                    <span className="mr-4">{name}</span>
                </div>
                <div className="">
                    {shortcutElem ?? null}
                </div>
            </motion.button>

        </>
    );
}


function RightMiniPanel({ }) {
    const [inverse] = useInverseScale();

    return (
        <>

            <button style={{
                transform: `scale(${inverse})`
            }} className=" 
            rounded-xl flex flex-row justify-between pr-1 pl-1 dark:bg-darkPanle bg-lightPanle text-whiteBoard-one">
                <Icon useDefault theSrc={'/icons/dublicateLight.png'} />
                <Icon useDefault theSrc={'/icons/deleteIconLight1.png'} />
                <Icon useDefault theSrc={'/icons/moreLight.png'} />
            </button>
        </>
    );
}

function RightPanel({ onDublicate, onCopy, onPaste, onDelete, onLayers }) {
    const [inverse] = useInverseScale();

    return (
        <>
            <div style={{
                transform: `scale(${inverse})`
            }} className="p-1 pr-1 flex flex-col pb-8
             dark:bg-darkPanle bg-lightPanle text-whiteBoard-one rounded-md  ">
                <Option iconElem={<Icon theSrc={'/icons/dublicateLight.png'} />} name={'Dublicate'} />
                <Option shortcutElem={<Shortcuts>Ctrl + c</Shortcuts>} iconElem={<Icon theSrc={'/icons/copyLight.png'} />} name={'Copy'} />
                <Option shortcutElem={<Shortcuts>Ctrl + p</Shortcuts>} iconElem={<Icon theSrc={'/icons/pasteLight.png'} />} name={'Paste'} />
                <Option iconElem={<Icon theSrc={'/icons/deleteIconLight1.png'} />} name={'Delete'} />
                <Option iconElem={<Icon theSrc={'/icons/layersLight.png'} />} name={'Layers'} />

            </div>
        </>
    );
}


export { RightPanel, RightMiniPanel }