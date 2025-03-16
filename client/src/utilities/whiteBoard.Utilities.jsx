import { Rectangle, Circle, Triangle, Ellipse } from "../components/shapes/shapes";

const handleScroll = (scrollControlBool, innerDiv, divelem) => {
    //if (scrollControlBool.current) {
    let currentWidth = innerDiv.current.clientWidth
    let currentHeight = innerDiv.current.clientHeight;
    const parameters = {
        scrollCheck: 5,
        totalScroll: (divelem.current.scrollWidth - divelem.current.clientWidth),
        rightScroll: (divelem.current.scrollWidth - divelem.current.clientWidth) - divelem.current.scrollLeft,
        bottomScroll: (divelem.current.scrollHeight - divelem.current.clientHeight) - divelem.current.scrollTop
    }

    const newWidth = (10 + currentWidth) + "px";   //control the value of increment
    const newHeight = (10 + currentHeight) + "px"; //control the value of increment

    if (divelem.current.scrollLeft < parameters.scrollCheck) {
        innerDiv.current.style.width = newWidth;
        //console.log('the new width  : ', innerDiv.current.clientWidth);
        divelem.current.scrollTo({ left: 5 });

    }
    if (parameters.rightScroll < parameters.scrollCheck) {
        innerDiv.current.style.width = newWidth;
        divelem.current.scrollTo({ left: (divelem.current.scrollWidth - divelem.current.clientWidth) - 5 });
    }
    if (divelem.current.scrollTop < parameters.scrollCheck) {
        // console.log('top scroll conditions used');
        innerDiv.current.style.height = newHeight;
        //console.log('the new width  : ', innerDiv.current.clientWidth);
        divelem.current.scrollTo({ top: 5 });

    }
    if (parameters.bottomScroll < parameters.scrollCheck) {
        //  console.log('bottom scroll condtions used');
        innerDiv.current.style.height = newHeight;
        divelem.current.scrollTo({ top: (divelem.current.scrollHeight - divelem.current.clientHeight) - 5 });
    }
    //}
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
        console.log('the scroll is : ', prevScale.current, "%")

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

    down: (selectedItem) => {
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
    engageItem: (selectedItem, innerDiv, prevScale, defaultScale, setItemTools = { setSvgArray: null, setPen: null, penStyle }, e) => {

        if (selectedItem.type === 'shapes') {

            if (selectedItem.current) {
                const normalizeScale = prevScale.current / defaultScale.current;
                const position = getMouseCoordinateByElem(innerDiv, e, prevScale.current, defaultScale.current);

                if (selectedItem.current === 'rectangle') {
                    setItemTools.setSvgArray((prev) => {
                        let newOne = prev.slice();
                        newOne.push(<Rectangle x={position.x} y={position.y} width={150 / normalizeScale} height={100 / normalizeScale} useAs={'rectangle'} />);
                        return newOne;
                    });
                    selectedItem.current = null;
                }
                else if (selectedItem.current === 'circle') {

                    setItemTools.setSvgArray((prev) => {
                        let newOne = prev.slice();
                        newOne.push(<Circle x={position.x} y={position.y} width={200 / normalizeScale} height={200 / normalizeScale} />);
                        return newOne;
                    });
                    selectedItem.current = null;
                }

                else if (selectedItem.current === 'ellipse') {

                    setItemTools.setSvgArray((prev) => {
                        let newOne = prev.slice();
                        newOne.push(<Ellipse x={position.x} y={position.y} width={200 / normalizeScale} height={150 / normalizeScale} />);
                        return newOne;
                    });
                    selectedItem.current = null;
                }

                else if (selectedItem.current === 'square') {

                    setItemTools.setSvgArray((prev) => {
                        let newOne = prev.slice();
                        newOne.push(<Rectangle x={position.x} y={position.y} width={150 / normalizeScale} height={150 / normalizeScale} useAs={'square'} />);
                        return newOne;
                    });
                    selectedItem.current = null;
                }

                else if (selectedItem.current === 'triangle') {

                    setItemTools.setSvgArray((prev) => {
                        let newOne = prev.slice();
                        newOne.push(<Triangle x={position.x} y={position.y} width={150 / normalizeScale} height={150 / normalizeScale} />);
                        return newOne;
                    });
                    selectedItem.current = null;
                }
            }


        }
        else if (selectedItem.type === 'pens') {
            console.log("a pen is selected, we should create it now for : ", selectedItem.current);
            setItemTools.setPen();
        }
    }
}

function preventDefault(e) {
    e.preventDefault();
}

function getMouseCoordinateByElem(elemRef, event, prevScale, defaultScale) {
    const normalizeScale = prevScale / defaultScale;
    const currentPosition = elemRef.current.getBoundingClientRect();
    return {
        x: (event.clientX - currentPosition.left) / normalizeScale,
        y: (event.clientY - currentPosition.top) / normalizeScale
    }
}









export { handleScroll, mouseEvent, otherEventHandle }