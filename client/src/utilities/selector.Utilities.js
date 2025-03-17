

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
    activeIncrement: (subjectRef, parentRef, theRef, boolRef, type, directDataIncrement = { enable: false }) => {
        setRefParametersRecords(subjectRef.current.svgRef);
        setRefParametersRecords(parentRef);

        if (type === 'width') {
            setRefParametersRecords(theRef);
            if (!directDataIncrement.enable)
                boolRef.current = "width";

            if (subjectRef.type === 'triangle') {
                subjectRef.current.svgElemRef.records = { points: subjectRef.current.svgElemRef.current.getAttribute('points').split(" ") };
            }
            // no record require for ellipse
        }
        else if (type === 'height') {
            setRefParametersRecords(theRef);

            if (!directDataIncrement.enable)
                boolRef.current = "height";

            if (subjectRef.type === 'triangle') {
                subjectRef.current.svgElemRef.records = { points: subjectRef.current.svgElemRef.current.getAttribute('points').split(" ") };
            }
            // no record require for ellipse
        }

    },

    activeDotIncrement: (subjectRef, parentRef, dotRef, mousePointerRef, boolRef, directDataIncrement = { enable: false }) => {
        setRefParametersRecords(subjectRef.current.svgRef);
        setRefParametersRecords(parentRef);
        setRefParametersRecords(dotRef);

        if (!directDataIncrement.enable) {
            mousePointerRef.records = { x: mousePointerRef.current.x, y: mousePointerRef.current.y };
            boolRef.current = "dot";
        }

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
        // console.log('from deactivate');
        boolRef.current = null;
    },

    performWidthIncrement: (subjectRef, mousePointerRef, widthRef, parentRef, directDataIncrement = { enable: false, width: null }) => {

        let relativeCursorPosition = null;
        let relativeWidthPosition = null;

        if (!directDataIncrement.enable) {       //for directData like width = 100 
            relativeCursorPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.current);
            relativeWidthPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, { x: widthRef.records.x, y: widthRef.records.y });
        }
        const newParameters = {
            width: directDataIncrement.enable ? directDataIncrement.width : subjectRef.current.svgRef.records.width + relativeCursorPosition.x - relativeWidthPosition.x,
        }
        //console.log('the width use to the in increment is : ', newParameters.width);
        if (newParameters.width >= 1 || newParameters.width === 'zero') {

            if (!directDataIncrement.enable)
                setLeftTop(relativeCursorPosition.x, null, widthRef);


            if (subjectRef.type === 'rectangle') {

                if (directDataIncrement.enable) {
                    newParameters.width = directDataIncrement.width === 'zero' ? 10 : directDataIncrement.width + 5;


                }
                console.log('the width use to the rectangle is : ', newParameters.width);
                subjectRef.current.svgRef.current.style.width = newParameters.width + 'px';
                subjectRef.current.svgElemRef.current.style.x = '5px';
                subjectRef.current.svgElemRef.current.style.y = '5px';
                subjectRef.current.svgElemRef.current.style.width = (newParameters.width - 10) + 'px';

            }
            else if (subjectRef.type === 'triangle') {
                let oldPoints = {
                    p1: subjectRef.current.svgElemRef.records.points[0].split(','),
                    p2: subjectRef.current.svgElemRef.records.points[1].split(','),
                    p3: subjectRef.current.svgElemRef.records.points[2].split(','),
                }

                if (directDataIncrement.enable) {         //parametes for directData
                    newParameters.points = {};
                    newParameters.width = parseFloat(oldPoints.p2[0]) + directDataIncrement.width + 5;

                    newParameters.points.p1 = {
                        x: newParameters.width / 2,
                        y: parseFloat(oldPoints.p1[1])
                    },
                        newParameters.points.p2 = {
                            x: parseFloat(oldPoints.p2[0]),
                            y: parseFloat(oldPoints.p2[1])
                        },
                        newParameters.points.p3 = {
                            x: newParameters.width - 5,
                            y: parseFloat(oldPoints.p3[1])
                        }

                } else {
                    newParameters.points = {                 //parametes for intractiveData
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
                }

                console.log('the points of triangle : ', newParameters.points);
                console.log('it must be : ', typeof (directDataIncrement.width))

                //subjectRef.current.svgRef.current.style.width = (newParameters.points.p3.x + 0.1 * newParameters.points.p3.x) + 'px';
                subjectRef.current.svgRef.current.style.width = newParameters.width + 'px';
                subjectRef.current.svgElemRef.current.setAttribute('points', `${newParameters.points.p1.x},${newParameters.points.p1.y} ${newParameters.points.p2.x},${newParameters.points.p2.y} ${newParameters.points.p3.x},${newParameters.points.p3.y}`);

            }
            else if (subjectRef.type === 'ellipse') {

                if (directDataIncrement.enable) {
                    newParameters.width = directDataIncrement.width === 'zero' ? 5 : directDataIncrement.width * 2 + 5;

                    newParameters.rx = directDataIncrement.width === 'zero' ? 0 : directDataIncrement.width;
                    newParameters.cx = newParameters.width / 2;
                } else {
                    newParameters.rx = newParameters.width / 2 - 5;
                    newParameters.cx = newParameters.width / 2;
                }
                subjectRef.current.svgRef.current.style.width = newParameters.width + 'px';
                subjectRef.current.svgElemRef.current.setAttribute('rx', newParameters.rx);
                subjectRef.current.svgElemRef.current.setAttribute('cx', newParameters.cx);
            }
        }
    },
    performHeightIncrement: (subjectRef, mousePointerRef, heightRef, parentRef, directDataIncrement = { enable: false, height: null }) => {
        //console.log('parentRecords : ', parentRef);
        let relativeCursorPosition = null;
        let relativeHeightPosition = null;

        if (!directDataIncrement.enable) {
            relativeCursorPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.current);
            relativeHeightPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, { x: heightRef.records.x, y: heightRef.records.y });
        }

        const newParameters = {
            height: directDataIncrement.enable ? directDataIncrement.height : subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeHeightPosition.y,
        }
        //console.log('the height use to the in increment is : ', newParameters.height);

        if (newParameters.height >= 1 || newParameters.height === 'zero') {

            if (!directDataIncrement.enable)
                setLeftTop(null, relativeCursorPosition.y, heightRef);

            if (subjectRef.type === 'rectangle') {
                if (directDataIncrement.enable) {
                    newParameters.height = directDataIncrement.height === 'zero' ? 10 : directDataIncrement.height + 5
                }
                subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';
                subjectRef.current.svgElemRef.current.style.height = (newParameters.height - 10) + 'px';
                subjectRef.current.svgElemRef.current.style.x = '5px';
                subjectRef.current.svgElemRef.current.style.y = '5px';
            }
            else if (subjectRef.type === 'triangle') {
                let oldPoints = {
                    p1: subjectRef.current.svgElemRef.records.points[0].split(','),
                    p2: subjectRef.current.svgElemRef.records.points[1].split(','),
                    p3: subjectRef.current.svgElemRef.records.points[2].split(','),
                }

                if (directDataIncrement.enable) {         //parametes for directData
                    newParameters.points = {};
                    newParameters.height = parseFloat(oldPoints.p1[1]) + directDataIncrement.height + 5;

                    newParameters.points.p1 = {
                        x: parseFloat(oldPoints.p1[0]),
                        y: parseFloat(oldPoints.p1[1])
                    },
                        newParameters.points.p2 = {
                            x: parseFloat(oldPoints.p2[0]),
                            y: newParameters.height - 5
                        },
                        newParameters.points.p3 = {
                            x: parseFloat(oldPoints.p3[0]),
                            y: newParameters.height - 5
                        }

                } else {
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
                }

                subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';
                subjectRef.current.svgElemRef.current.setAttribute('points', `${newParameters.points.p1.x},${newParameters.points.p1.y} ${newParameters.points.p2.x},${newParameters.points.p2.y} ${newParameters.points.p3.x},${newParameters.points.p3.y}`);

            }
            else if (subjectRef.type === 'ellipse') {


                if (directDataIncrement.enable) {

                    newParameters.height = directDataIncrement.height === 'zero' ? 5 : directDataIncrement.height * 2 + 5;

                    newParameters.ry = directDataIncrement.height === 'zero' ? 0 : directDataIncrement.height;
                    newParameters.cy = newParameters.height / 2;

                } else {
                    newParameters.ry = newParameters.height / 2 - 5;
                    newParameters.cy = newParameters.height / 2;
                }

                subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';
                subjectRef.current.svgElemRef.current.setAttribute('ry', newParameters.ry);
                subjectRef.current.svgElemRef.current.setAttribute('cy', newParameters.cy);
            }
        }
    },
    performDotIncrement: (subjectRef, mousePointerRef, dotRef, parentRef, directDataIncrement = { enable: false, length: null }) => {

        let relativeCursorPosition = null;
        let relativeCursorRecordedPosition = null;
        let relativeDotPosition = null;

        if (!directDataIncrement.enable) {
            relativeCursorRecordedPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.records);
            relativeCursorPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, mousePointerRef.current);
            relativeDotPosition = positionResToParent({ x: parentRef.records.x, y: parentRef.records.y }, { x: dotRef.records.x, y: dotRef.records.y });
        }

        const newParameters = {};

        if (subjectRef.type === 'rectangle') {
            newParameters.height = subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
            newParameters.width = subjectRef.current.svgRef.records.width + relativeCursorPosition.x - relativeCursorRecordedPosition.x;

            subjectRef.current.svgRef.current.style.width = newParameters.width + 'px';
            subjectRef.current.svgRef.current.style.height = newParameters.height + 'px';

            subjectRef.current.svgElemRef.current.style.x = '5px';
            subjectRef.current.svgElemRef.current.style.y = '5px';
            subjectRef.current.svgElemRef.current.style.width = (newParameters.width - 10) + 'px';
            subjectRef.current.svgElemRef.current.style.height = (newParameters.height - 10) + 'px';
        }
        else if (subjectRef.type === 'circle') {

            if (directDataIncrement.enable) {
                newParameters.length = directDataIncrement.length === 'zero' ? 5 : directDataIncrement.length * 2 + 5;
                newParameters.r = directDataIncrement.length === 'zero' ? 0 : directDataIncrement.length;

            } else {
                newParameters.length = subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
                newParameters.r = newParameters.length / 2 - 5;
            }
            subjectRef.current.svgRef.current.style.width = newParameters.length + 'px';
            subjectRef.current.svgRef.current.style.height = newParameters.length + 'px';

            subjectRef.current.svgElemRef.current.style.r = newParameters.r + 'px';
            subjectRef.current.svgElemRef.current.style.cx = newParameters.length / 2 + 'px';
            subjectRef.current.svgElemRef.current.style.cy = newParameters.length / 2 + 'px';
        }
        else if (subjectRef.type === 'square') {
            // newParameters.length = directDataIncrement.enable ? directDataIncrement.length + 5 : subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
            if (directDataIncrement.enable) {
                newParameters.length = directDataIncrement.length === 'zero' ? 5 : directDataIncrement.length + 5;
                newParameters.side = directDataIncrement.length === 'zero' ? 0 : directDataIncrement.length;

            } else {
                newParameters.length = subjectRef.current.svgRef.records.height + relativeCursorPosition.y - relativeCursorRecordedPosition.y;
                newParameters.side = newParameters.length - 5;
            }
            subjectRef.current.svgRef.current.style.width = newParameters.length + 'px';
            subjectRef.current.svgRef.current.style.height = newParameters.length + 'px';

            subjectRef.current.svgElemRef.current.style.width = newParameters.side + 'px';
            subjectRef.current.svgElemRef.current.style.height = newParameters.side + 'px';
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
            newParameters.ry = newParameters.height / 2 - 5;
            newParameters.cy = newParameters.height / 2;
            newParameters.rx = newParameters.width / 2 - 5;
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
    },

    performBorderModification: (selectedElem, modification = { type: null, strokeWidth: null, radius: null }) => {
        console.log('going to perform the border modification with this data : ', modification);

        if (modification.type === 'strokeWidth') {
            if (modification.strokeWidth === 'zero') {
                selectedElem.current.svgElemRef.current.style.strokeWidth = 0;
            } else {
                selectedElem.current.svgElemRef.current.style.strokeWidth = modification.strokeWidth;
            }
        } else if (modification.type === 'radius') {

            if (modification.radius === 'zero') {
                selectedElem.current.svgElemRef.current.style.rx = 0;
            } else {
                selectedElem.current.svgElemRef.current.style.rx = modification.radius;
            }


        }
    },
    performColorModification: (selectedElem, modification = { type: null, hexColor: null }) => {
        console.log('going to perform the border modification with this data : ', modification);

        if (modification.type === 'borderColor') {
            selectedElem.current.svgElemRef.current.style.stroke = modification.hexColor;
        } else if (modification.type === 'bodyColor') {
            selectedElem.current.svgElemRef.current.style.fill = modification.hexColor;
        }
    }


}

const otherFunctions = {
    setSelectorBodyToSubject,
    unsetSelectorBodyToSubject,
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
    },

}

const bindedToUseInThisModule = {};


function setSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef, subjectRef, parentRef, toEffect = { all: true, width: null, height: null, dot: null, move: null }) {
    const parentPos = bindedToUseInThisModule.boundingDataRespectToZoom(parentRef);
    const subjectPos = bindedToUseInThisModule.boundingDataRespectToZoom(subjectRef.current.svgRef);
    const newParameteres = {};

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

    newParameteres.forDotRef = {
        left: subjectPos.x - parentPos.x + subjectPos.width,
        top: subjectPos.y - parentPos.y + subjectPos.height
    };

    if (toEffect.all || toEffect.dot) {
        setLeftTop(newParameteres.forDotRef.left, newParameteres.forDotRef.top, dotRef);
    }

    newParameteres.forMoveRef = {
        left: subjectPos.x - parentPos.x + subjectPos.width / 2,
        top: subjectPos.y - parentPos.y + subjectPos.height + 10
    }
    if (toEffect.all || toEffect.move) {
        setLeftTop(newParameteres.forMoveRef.left, newParameteres.forMoveRef.top, moveRef);
    }
}

function unsetSelectorBodyToSubject(widthRef, heightRef, dotRef, moveRef) {

    const removeCoord = -10
    setLeftTop(removeCoord, removeCoord, widthRef);
    setLeftTop(removeCoord, removeCoord, heightRef);
    setLeftTop(removeCoord, removeCoord, dotRef);
    setLeftTop(removeCoord, removeCoord, moveRef);
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