import { useRef, useState, useEffect } from 'react';
import { effectEventClass } from '../../myLib/effectEventClass';



function ScrollBar({ forWidth, forHeight, viewWidth, viewHeight, innerDiv, parentDiv }) {
    const [horizontalBar, setHorizontal] = useState({
        totalThumbWidth: 150,
    })

    const [verticalBar, setVertical] = useState({
        totalThumbHeight: 150,
    })

    const horizontalBarRef = useRef({
        totalWidth: 400,
        thumbStartFrom: 2,
        minThumb: 100,
    })
    const verticalBarRef = useRef({
        totalHeight: 400,
        thumbStartFrom: 2,
        minThumb: 100,
    })

    const boolMove = useRef(false);
    const saveMiddleMouse = useRef({});
    const translate = useRef({
        x: 50,
        y: 0,
        workX: 0,
        workY: 0
    })


    function performMiddleMouseNavigate(e) {
        if (boolMove.current) {
            const move = {
                x: e.clientX - saveMiddleMouse.current.x,
                y: e.clientY - saveMiddleMouse.current.y,
            }
            if (!innerDiv) {
                console.error("please provide innerDiv");
                return;
            }

            innerDiv.current.style.transform = `translateX(${(move.x + translate.current.x)}px) translateY(${(move.y + translate.current.y)}px)`

            translate.current.workX = move.x;
            translate.current.workY = move.y;

        }
    }

    function activeNavigation(e) {

        if (e.button === 1) {
            boolMove.current = true;
            saveMiddleMouse.current.x = e.clientX;
            saveMiddleMouse.current.y = e.clientY;
        }


    }

    function stopNavigation() {
        boolMove.current = false;
        translate.current.x += translate.current.workX;
        translate.current.y += translate.current.workY;
    }


    useEffect(() => {
        if (forWidth && forHeight) {
            //calibrateLengths(forWidth, horizontalBarRef.current.totalWidth);
            //calibrateLengths(forHeight, verticalBarRef.current.totalHeight);

        }
    }, [forWidth, forHeight, viewWidth, viewHeight])

    useEffect(() => {
        let theEvents = new effectEventClass();

        if (innerDiv) {

            theEvents.setEvent(innerDiv, 'mousedown', activeNavigation);
            theEvents.setEvent(innerDiv, 'mouseup', stopNavigation);
            theEvents.setEvent(innerDiv, 'mousemove', performMiddleMouseNavigate);
            theEvents.setEvent(parentDiv, 'mouseleave', stopNavigation);
        }
        return (() => {
            theEvents.returnEvents();
        })
    }, [innerDiv])


    function calibrateLengths(length, totalLength, minThumb, thumbStart) {
        let lenghtToUse = totalLength - minThumb - thumbStart;
        return totalLength - lenghtToUse;
    }

    return (
        <>
            <div className='absolute top-15'>
                {/* 
                 -- Vertical scroll bar
             */}

                <div className='w-[16px] h-[400px]
                 bg-amber-950 rounded-lg flex flex-row justify-center'>
                    <div style={{
                        height: verticalBar.totalThumbHeight + 'px',
                    }} className='h-[150px] w-[8px] m-1  bg-amber-100 rounded-xl'>

                    </div>
                </div>

            </div>

            <div className='absolute top-5 left-[20%]'>
                {/* 
                  -- Horizotal scroll bar
             */}

                <div className='w-[400px] h-[16px] 
                bg-amber-950 rounded-lg flex flex-row items-center'>
                    <div style={{
                        width: horizontalBar.totalThumbWidth + 'px'
                    }} className=' w-[150px] h-[8px] m-1  bg-amber-100 rounded-xl'>

                    </div>
                </div>

            </div>
        </>
    );
}


export default ScrollBar