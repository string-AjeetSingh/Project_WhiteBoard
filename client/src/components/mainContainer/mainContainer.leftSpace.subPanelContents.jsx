import { useEffect, useRef } from "react";

function Shapes({ src, cssClass }) {
    const shapeDiv = useRef(null);

    function handleMouseEnter(event) {
        event.stopPropagation();
        shapeDiv.current.classList.add('shapeIconActive');
    }
    function handleMouseLeave() {
        shapeDiv.current.classList.remove('shapeIconActive');
    }

    useEffect(() => {
        if (shapeDiv.current) {
            shapeDiv.current.addEventListener('mouseenter', handleMouseEnter);
            shapeDiv.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (shapeDiv.current) {
                shapeDiv.current.removeEventListener('mouseenter', handleMouseEnter)
                shapeDiv.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        }


    }, [shapeDiv.current])
    return (
        <>
            <img ref={shapeDiv} className={`size-24 m-2 shapeIcon ${cssClass}`} src={src}>
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

                    <div ref={backDiv} className={`backShow size-30 bg-white m-1  rounded-xl`}>

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

                    <div ref={backDiv} className={`backShow size-30 bg-whiteBoard-one m-1 rounded-xl`}>

                    </div>
                    <span className="text-[1.2rem] font-bold dark:text-white">White Blue</span>
                </div>
            </>
        );
    }

}


function SubPanelContent({ index }) {

    if (index === 1) {
        return (
            <>
                <div className="w-full flex flex-row flex-wrap justify-around 
                 m-2 border border-amber-200 ">
                    <Shapes src="/icons/squareShapeLight.png" />
                    <Shapes src="/icons/rectangleShapeLight.png" />
                    <Shapes src="/icons/circleShapeLight.png" />
                    <Shapes src="/icons/triangleShapeLight.png" />
                    <Shapes src="/icons/ovalShapeLight.png" />
                </div>
            </>
        );

    }

    else if (index === 2) {
        return (
            <>
                <div className="w-full grow m-2 border border-amber-800  h-[500px]">

                </div>
            </>
        );

    }
    else if (index === 3) {
        return (
            <>

                <div className="w-full flex flex-col items-center justify-center
                 grow m-2 border border-amber-500  h-[500px]">
                    <BackGroundShow mode={"white"} />

                    <BackGroundShow />
                </div>
            </>
        );

    }

}


export { SubPanelContent }