import { sub } from "framer-motion/client";

const selectorWork = {
    select: (widthRef, heightRef, dotRef, moveRef, subjectRef, parentRef) => {
        if (subjectRef.type === 'rectangle') {
            setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, subjectRef, parentRef);
        }
        else if (subjectRef.type === 'circle') {
            setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, subjectRef, parentRef, { dot: true, move: true });
        }
        else if (subjectRef.type === 'square') {
            setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, subjectRef, parentRef, { dot: true, move: true });
        }
        else if (subjectRef.type === 'triangle') {
            setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, subjectRef, parentRef);
        }
        else if (subjectRef.type === 'ellipse') {
            setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, subjectRef, parentRef);
        }

    },
    activeIncrement: (subjectRef, parentRef, theRef, boolRef, type) => {

        setRefParametersRecords(subjectRef.current.svgRef);
        setRefParametersRecords(parentRef);

        if (type === 'width') {
            setRefParametersRecords(theRef);
            boolRef.current = "width";

            if (subjectRef.type === 'triangle') {
                subjectRef.current.svgElemRef.records = { points: subjectRef.current.svgElemRef.current.getAttribute('points').split(" ") };
            }
            // no record require for ellipse
        }
        else if (type === 'height') {
            setRefParametersRecords(theRef);
            boolRef.current = "height";

            if (subjectRef.type === 'triangle') {
                subjectRef.current.svgElemRef.records = { points: subjectRef.current.svgElemRef.current.getAttribute('points').split(" ") };
            }
            // no record require for ellipse

        }

    },

    activeDotIncrement: (subjectRef, parentRef, dotRef, mousePointerRef, boolRef) => {

        setRefParametersRecords(subjectRef.current.svgRef);
        setRefParametersRecords(parentRef);
        setRefParametersRecords(dotRef);
        mousePointerRef.records = { x: mousePointerRef.current.x, y: mousePointerRef.current.y };
        boolRef.current = "dot";

        if (subjectRef.type === 'triangle') {
            subjectRef.current.svgElemRef.records = { points: subjectRef.current.svgElemRef.current.getAttribute('points').split(" ") };
        }
        // no record require for circle
        // no record require for ellipse

    },

    activeMovement: (subjectRef, parentRef, theRef, mousePointerRef, boolRef) => {
        setRefParametersRecords(subjectRef.current.svgRef);
        setRefParametersRecords(parentRef);
        setRefParametersRecords(theRef);
        mousePointerRef.records = { x: mousePointerRef.current.x, y: mousePointerRef.current.y };
        boolRef.current = "move";


    },




    deActivateIncrement: (boolRef) => {
        boolRef.current = null;
    },

    performWidthIncrement: (subjectRef, mousePointerRef, widthRef, parentRef) => {


        //widthSelector movement
        const relativeCursorPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.current);
        const relativeWidthPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, { x: widthRef.records.x, y: widthRef.records.y });

        //console.log('difference new width to increase : ', relativeCursorPosition.x - relativeWidthPosition.x);

        const newParameters = {
            width: subjectRef.current.svgRef.records.width + relativeCursorPosition.x - relativeWidthPosition.x,
        }
        if (newParameters.width > 1) {


            setLeftTop(relativeCursorPosition.x, null, widthRef);
            subjectRef.current.svgRef.current.style.width = newParameters.width + 'px';

            if (subjectRef.type === 'rectangle') {
                subjectRef.current.svgElemRef.current.style.width = newParameters.width + 'px';

            }
            if (subjectRef.type === 'triangle') {
                let oldPoints = {
                    p1: subjectRef.current.svgElemRef.records.points[0].split(','),
                    p2: subjectRef.current.svgElemRef.records.points[1].split(','),
                    p3: subjectRef.current.svgElemRef.records.points[2].split(','),
                }

                newParameters.points = {
                    p1: {
                        x: newParameters.width / 2,
                        y: parseFloat(oldPoints.p1[1])
                    },
                    p2: {
                        x: parseFloat(oldPoints.p2[0]),
                        y: parseFloat(oldPoints.p2[1])
                    },
                    p3: {
                        x: parseFloat(oldPoints.p3[0]) + relativeCursorPosition.x - relativeWidthPosition.x,
                        y: parseFloat(oldPoints.p3[1])
                    },

                }

                subjectRef.current.svgElemRef.current.setAttribute('points', `${newParameters.points.p1.x},${newParameters.points.p1.y} ${newParameters.points.p2.x},${newParameters.points.p2.y} ${newParameters.points.p3.x},${newParameters.points.p3.y}`);

            }
            else if (subjectRef.type === 'ellipse') {
                newParameters.rx = newParameters.width / 2 - 20;
                newParameters.cx = newParameters.width / 2;
                subjectRef.current.svgElemRef.current.setAttribute('rx', newParameters.rx);
                subjectRef.current.svgElemRef.current.setAttribute('cx', newParameters.cx);
            }
        }
    },
    performHeightIncrement: (subjectRef, mousePointerRef, heightRef, parentRef) => {
        //console.log('parentRecords : ', parentRef);


        const relativeCursorPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.current);
        const relativeHeightPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, { x: heightRef.records.x, y: heightRef.records.y });

        const newParameters = {
            height: subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeHeightPosition.y,

        }

        subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';

        if (newParameters.height > 1) {
            setLeftTop(null, relativeCursorPosition.y, heightRef);

            if (subjectRef.type === 'rectangle') {
                subjectRef.current.svgElemRef.current.style.height = newParameters.height + 'px';

            }
            if (subjectRef.type === 'triangle') {
                let oldPoints = {
                    p1: subjectRef.current.svgElemRef.records.points[0].split(','),
                    p2: subjectRef.current.svgElemRef.records.points[1].split(','),
                    p3: subjectRef.current.svgElemRef.records.points[2].split(','),
                }


                newParameters.points = {
                    p1: {
                        x: parseFloat(oldPoints.p1[0]),
                        y: parseFloat(oldPoints.p1[1])
                    },
                    p2: {
                        x: parseFloat(oldPoints.p2[0]),
                        y: parseFloat(oldPoints.p2[1]) + relativeCursorPosition.y - relativeHeightPosition.y,
                    },
                    p3: {
                        x: parseFloat(oldPoints.p3[0]),
                        y: parseFloat(oldPoints.p3[1]) + relativeCursorPosition.y - relativeHeightPosition.y,
                    },

                }

                subjectRef.current.svgElemRef.current.setAttribute('points', `${newParameters.points.p1.x},${newParameters.points.p1.y} ${newParameters.points.p2.x},${newParameters.points.p2.y} ${newParameters.points.p3.x},${newParameters.points.p3.y}`);

            }
            else if (subjectRef.type === 'ellipse') {
                newParameters.ry = newParameters.height / 2 - 20;
                newParameters.cy = newParameters.height / 2;
                subjectRef.current.svgElemRef.current.setAttribute('ry', newParameters.ry);
                subjectRef.current.svgElemRef.current.setAttribute('cy', newParameters.cy);
            }
        }
    },
    performDotIncrement: (subjectRef, mousePointerRef, dotRef, parentRef) => {
        //console.log('parentRecords : ', parentRef);
        const relativeCursorRecordedPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.records);
        const relativeCursorPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.current);
        const relativeDotPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, { x: dotRef.records.x, y: dotRef.records.y });

        const newParameters = {};

        newParameters.left = relativeDotPosition.x + relativeCursorPosition.x - relativeCursorRecordedPosition.x;
        newParameters.top = relativeDotPosition.y + relativeCursorPosition.y - relativeCursorRecordedPosition.y;

        //  setLeftTop(newParameters.left, newParameters.top, dotRef);
        if (subjectRef.type === 'rectangle') {
            newParameters.height = subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
            newParameters.width = subjectRef.current.svgRef.records.width + relativeCursorPosition.x - relativeCursorRecordedPosition.x;

            subjectRef.current.svgRef.current.style.width = newParameters.width + 'px';
            subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';

            subjectRef.current.svgElemRef.current.style.width = newParameters.width + 'px';
            subjectRef.current.svgElemRef.current.style.height = newParameters.height + 'px';
        }
        else if (subjectRef.type === 'circle') {
            newParameters.height = subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;

            subjectRef.current.svgRef.current.style.width = newParameters.height + 'px';
            subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';

            newParameters.r = newParameters.height / 2 - 20;
            subjectRef.current.svgElemRef.current.style.r = newParameters.r + 'px';
            subjectRef.current.svgElemRef.current.style.cx = newParameters.height / 2 + 'px';
            subjectRef.current.svgElemRef.current.style.cy = newParameters.height / 2 + 'px';
        }
        else if (subjectRef.type === 'square') {
            newParameters.height = subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;

            subjectRef.current.svgRef.current.style.width = newParameters.height + 'px';
            subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';

            subjectRef.current.svgElemRef.current.style.width = newParameters.height + 'px';
            subjectRef.current.svgElemRef.current.style.height = newParameters.height + 'px';
        }
        else if (subjectRef.type === 'triangle') {
            newParameters.height = subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
            newParameters.width = subjectRef.current.svgRef.records.width + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
            let oldPoints = {
                p1: subjectRef.current.svgElemRef.records.points[0].split(','),
                p2: subjectRef.current.svgElemRef.records.points[1].split(','),
                p3: subjectRef.current.svgElemRef.records.points[2].split(','),
            }


            newParameters.points = {
                p1: {
                    x: newParameters.width / 2,
                    y: parseFloat(oldPoints.p1[1])
                },
                p2: {
                    x: parseFloat(oldPoints.p2[0]),
                    y: parseFloat(oldPoints.p2[1]) + relativeCursorPosition.y - relativeCursorRecordedPosition.y,
                },
                p3: {
                    x: parseFloat(oldPoints.p3[0]) + relativeCursorPosition.y - relativeCursorRecordedPosition.y,
                    y: parseFloat(oldPoints.p3[1]) + relativeCursorPosition.y - relativeCursorRecordedPosition.y,
                },

            }

            subjectRef.current.svgRef.current.style.width = newParameters.width + 'px';
            subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';
            subjectRef.current.svgElemRef.current.setAttribute('points', `${newParameters.points.p1.x},${newParameters.points.p1.y} ${newParameters.points.p2.x},${newParameters.points.p2.y} ${newParameters.points.p3.x},${newParameters.points.p3.y}`);

        }
        else if (subjectRef.type === 'ellipse') {
            newParameters.height = subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
            newParameters.width = subjectRef.current.svgRef.records.width + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
            newParameters.ry = newParameters.height / 2 - 20;
            newParameters.cy = newParameters.height / 2;
            newParameters.rx = newParameters.width / 2 - 20;
            newParameters.cx = newParameters.width / 2;

            subjectRef.current.svgRef.current.style.width = newParameters.width + 'px';
            subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';
            subjectRef.current.svgElemRef.current.setAttribute('ry', newParameters.ry);
            subjectRef.current.svgElemRef.current.setAttribute('rx', newParameters.rx);
            subjectRef.current.svgElemRef.current.setAttribute('cy', newParameters.cy);
            subjectRef.current.svgElemRef.current.setAttribute('cx', newParameters.cx);

        }


    },

    performMovement: (subjectRef, parentRef, moveRef, mousePointerRef) => {
        const relativeCursorPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.current);
        const relativeCursorRecordedPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.records);
        const relativeMovePosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, { x: moveRef.records.x, y: moveRef.records.y });
        const relativeSubjectPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, { x: subjectRef.current.svgRef.records.x, y: subjectRef.current.svgRef.records.y });

        const newParameters = {
            subject: {
                left: relativeSubjectPosition.x + relativeCursorPosition.x - relativeCursorRecordedPosition.x,
                top: relativeSubjectPosition.y + relativeCursorPosition.y - relativeCursorRecordedPosition.y,
            },
            move: {
                left: relativeMovePosition.x + relativeCursorPosition.x - relativeCursorRecordedPosition.x,
                top: relativeMovePosition.y + relativeCursorPosition.y - relativeCursorRecordedPosition.y,
            }
        };


        setLeftTop(newParameters.move.left, newParameters.move.top, moveRef);
        setLeftTop(newParameters.subject.left, newParameters.subject.top, subjectRef.current.svgRef);
    }



}

const otherFunctions = {
    setSelectorBodyToSubject,
    getBoundingClientRectRespectToZoomScale: (normalizedScale, theRef) => {
        const boundingData = theRef.current.getBoundingClientRect();
        const scaleFactor = normalizedScale.current;

        // Create a new object with scaled values
        const scaledBoundingData = {
            x: boundingData.x / scaleFactor,
            y: boundingData.y / scaleFactor,
            width: boundingData.width / scaleFactor,
            height: boundingData.height / scaleFactor,
            top: boundingData.top / scaleFactor,
            left: boundingData.left / scaleFactor,
            right: boundingData.right / scaleFactor,
            bottom: boundingData.bottom / scaleFactor
        };

        return scaledBoundingData;
    },
    showSelectorBody: (widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv) => {

        if (selectedElem.type === 'circle') {
            otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { move: true, dot: true });
        }
        else if (selectedElem.type === 'rectangle') {
            otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { width: true, height: true, move: true, dot: true });
        }
        else if (selectedElem.type === 'square') {
            otherFunctions.setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, selectedElem, innerDiv, { move: true, dot: true });
        }
    }



}

const bindedToUseInThisModule = {

}


function setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, subjectRef, parentRef, toEffect = { all: true, width: null, height: null, dot: null, move: null }) {
    //const parentPos = parentRef.current.getBoundingClientRect();
    //const subjectPos = subjectRef.current.svgRef.current.getBoundingClientRect();
    const parentPos = bindedToUseInThisModule.boundingDataRespectToZoom(parentRef);
    const subjectPos = bindedToUseInThisModule.boundingDataRespectToZoom(subjectRef.current.svgRef);
    const newParameteres = {};



    /* 
    
    const newParameteres = {
        forWidthRef: {
            left: subjectPos.x - parentPos.x + subjectPos.width,
            top: subjectPos.y - parentPos.y
        },
        forHeightRef: {
            left: subjectPos.x - parentPos.x,
            top: subjectPos.y - parentPos.y + subjectPos.height
        },
        forDotRef: {
            left: subjectPos.x - parentPos.x + subjectPos.width,
            top: subjectPos.y - parentPos.y + subjectPos.height
        },
        forMoveRef: {
            left: subjectPos.x - parentPos.x + subjectPos.width / 2,
            top: subjectPos.y - parentPos.y + subjectPos.height + 10
        }
    }
    */

    //if (subjectRef.type === 'rectangle') {

    newParameteres.forWidthRef = {
        left: subjectPos.x - parentPos.x + subjectPos.width,
        top: subjectPos.y - parentPos.y
    };
    newParameteres.forHeightRef = {
        left: subjectPos.x - parentPos.x,
        top: subjectPos.y - parentPos.y + subjectPos.height
    };

    if (toEffect.all || toEffect.width) {
        setLeftTop(newParameteres.forWidthRef.left, newParameteres.forWidthRef.top, widthRef);
        widthRef.current.style.height = subjectPos.height + 'px';
    }
    if (toEffect.all || toEffect.height) {
        setLeftTop(newParameteres.forHeightRef.left, newParameteres.forHeightRef.top, heightRef);
        heightRef.current.style.width = subjectPos.width + "px";
    }
    //}

    //if (subjectRef.type === 'circle' || subjectRef.type === 'rectangle') {

    newParameteres.forDotRef = {
        left: subjectPos.x - parentPos.x + subjectPos.width,
        top: subjectPos.y - parentPos.y + subjectPos.height
    };

    if (toEffect.all || toEffect.dot) {
        setLeftTop(newParameteres.forDotRef.left, newParameteres.forDotRef.top, dotRef);
    }
    // }

    newParameteres.forMoveRef = {
        left: subjectPos.x - parentPos.x + subjectPos.width / 2,
        top: subjectPos.y - parentPos.y + subjectPos.height + 10
    }
    if (toEffect.all || toEffect.move) {
        setLeftTop(newParameteres.forMoveRef.left, newParameteres.forMoveRef.top, moveRef);
    }



}

function setLeftTop(left, top, ref) {
    if (left) {
        ref.current.style.left = left + "px";
    }
    if (top) {
        ref.current.style.top = top + "px";
    }
}

function positionResToParent(parent = { x: null, y: null }, subject = { x: null, y: null }) {
    return { x: subject.x - parent.x, y: subject.y - parent.y };
}

function setRefParametersRecords(ref) {
    //ref.records = ref.current.getBoundingClientRect();
    ref.records = bindedToUseInThisModule.boundingDataRespectToZoom(ref);
}

function setRefStyleParametersRecords(ref, demandArray = []) {
    const raw = getComputedStyle(ref.current);
    ref.records = {};

    demandArray.forEach((item) => {
        ref.records[item] = raw[item]
    });
}











export { selectorWork, otherFunctions, bindedToUseInThisModule }