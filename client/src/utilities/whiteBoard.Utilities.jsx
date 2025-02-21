import { Rectangle } from "../components/shapes/shapes";

const handleScroll = (scrollControlBool, innerDiv, divelem) => {
    if (scrollControlBool.current) {
        let currentWidth = innerDiv.current.clientWidth
        let currentHeight = innerDiv.current.clientHeight;
        const parameters = {
            scrollCheck: 0.01 * (divelem.current.scrollWidth - divelem.current.clientWidth),
            totalScroll: (divelem.current.scrollWidth - divelem.current.clientWidth),
            rightScroll: (divelem.current.scrollWidth - divelem.current.clientWidth) - divelem.current.scrollLeft,
            bottomScroll: (divelem.current.scrollHeight - divelem.current.clientHeight) - divelem.current.scrollTop
        }

        const newWidth = (10 + currentWidth) + "px";   //control the value of increment
        const newHeight = (10 + currentHeight) + "px"; //control the value of increment

        if (divelem.current.scrollLeft < parameters.scrollCheck) {
            innerDiv.current.style.width = newWidth;
            //console.log('the new width  : ', innerDiv.current.clientWidth);
            divelem.current.scrollTo({ left: 0.01 * (divelem.current.scrollWidth - divelem.current.clientWidth) });

        }
        if (parameters.rightScroll < parameters.scrollCheck) {
            innerDiv.current.style.width = newWidth;
            divelem.current.scrollTo({ left: (divelem.current.scrollWidth - divelem.current.clientWidth) - (0.01 * (divelem.current.scrollWidth - divelem.current.clientWidth)) });
        }
        if (divelem.current.scrollTop < parameters.scrollCheck) {
            // console.log('top scroll conditions used');
            innerDiv.current.style.height = newHeight;
            //console.log('the new width  : ', innerDiv.current.clientWidth);
            divelem.current.scrollTo({ top: 0.01 * (divelem.current.scrollHeight - divelem.current.clientHeight) });

        }
        if (parameters.bottomScroll < parameters.scrollCheck) {
            //  console.log('bottom scroll condtions used');
            innerDiv.current.style.height = newHeight;
            divelem.current.scrollTo({ top: (divelem.current.scrollHeight - divelem.current.clientHeight) - (0.01 * (divelem.current.scrollHeight - divelem.current.clientHeight)) });
        }
    }
}

const mouseEvent = {
    middleDown: (boolRef, pointerPosition, scrollPosition, divElem, e) => {
        e.preventDefault();
        if (e.button === 1) {
            // console.log('middle down found');
            boolRef.current = true;
            pointerPosition.current = [e.clientX, e.clientY];
            scrollPosition.current = [divElem.current.scrollLeft, divElem.current.scrollTop]
            // console.log('pointer pointed at  :', pointerPosition.current);


        }
    },

    middleUp: (boolRef, e) => {
        if (e.button === 1) {
            //console.log("the middle up found");
            boolRef.current = false;

        }
    },

    leave: (boolRef, e) => {
        if (boolRef.current) {
            // console.log("the middle up found");
            boolRef.current = false;

        }

    },

    wheelZoom: (ctrlhold, prevScale, thediv, totalScroll, e) => {
        // console.log('From Zoom the control hold : ', ctrlhold);


        if (ctrlhold.current) {
            console.log('the scroll is : ', prevScale.current, "%")
            if (e.deltaY > 0) {

                //console.log("wheel down");
                if (prevScale.current === totalScroll[1]) return;
                let newScale = prevScale.current - 5;
                thediv.current.style.transform = `scale(${newScale}%)`
                prevScale.current = newScale;


            } else if (e.deltaY < 0) {
                //console.log("wheel Up");
                if (prevScale.current === totalScroll[0]) return;
                let newScale = prevScale.current + 5;
                thediv.current.style.transform = `scale(${newScale}%)`
                prevScale.current = newScale;

            }
        }

    },

    move: (middleBoolRef, pointerPosition, scrollPosition, divElem, e) => {
        if (middleBoolRef.current) {

            const prevX = pointerPosition.current[2] ? pointerPosition.current[2] : pointerPosition.current[0];
            const prevY = pointerPosition.current[3] ? pointerPosition.current[3] : pointerPosition.current[1];

            if (e.clientX > prevX || e.clientX < prevX) {
                // console.log('increment X');
                divElem.current.scrollLeft = scrollPosition.current[0] + (pointerPosition.current[0] - e.clientX);

            }
            if (e.clientY > prevY || e.clientY < prevY) {
                divElem.current.scrollTop = scrollPosition.current[1] + (pointerPosition.current[1] - e.clientY);

            }


            pointerPosition.current[2] = e.clientX;
            pointerPosition.current[3] = e.clientY;

        }

    },

    down: (selectedShapes) => {
        //  console.log('shape Requested on Sheet : ', selectedShapes);

    }





}

const otherEventHandle = {
    preventZoomOnCtrl: (thediv, e) => {
        if (e.key === 'Control') {
            if (thediv.current) {

                thediv.current.addEventListener('wheel', preventDefault, { passive: false });
            }
        }
    },
    resumeZoomOnCtrl: (thediv, e) => {
        if (e.key === 'Control') {
            if (thediv.current) {

                thediv.current.removeEventListener('wheel', preventDefault);
            }
        }
    },
    createSvgElem: (selectedShapes, setSvgArray, innerDiv, e) => {
        if (selectedShapes.current) {

            const position = getMouseCoordinateByElem(innerDiv, e);
            if (selectedShapes.current === 'rectangle') {
                setSvgArray((prev) => {
                    let newOne = prev.slice();
                    newOne.push(<Rectangle x={position.x} y={position.y} width={150} height={100} />);
                    return newOne;
                });
                selectedShapes.current = null;
            }

        }
    }
}

function preventDefault(e) {
    e.preventDefault();
}

function getMouseCoordinateByElem(elemRef, event) {
    const currentPosition = elemRef.current.getBoundingClientRect();
    return {
        x: event.clientX - currentPosition.left,
        y: event.clientY - currentPosition.top
    }
}









export { handleScroll, mouseEvent, otherEventHandle }