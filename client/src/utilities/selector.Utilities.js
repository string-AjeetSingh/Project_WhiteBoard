const selectorWork = {
    select: (widthRef, heightRef, dotRef, subjectRef, parentRef) => {
        setSelectorBodyToSubject(widthRef, heightRef, dotRef, subjectRef, parentRef);
    }

}



function setSelectorBodyToSubject(widthRef, heightRef, dotRef, subjectRef, parentRef) {
    const parentPos = parentRef.current.getBoundingClientRect();
    const subjectPos = subjectRef.current.svgRef.current.getBoundingClientRect();

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
        }
    }

    setLeftTop(newParameteres.forWidthRef.left, newParameteres.forWidthRef.top, widthRef);
    setLeftTop(newParameteres.forHeightRef.left, newParameteres.forHeightRef.top, heightRef);
    setLeftTop(newParameteres.forDotRef.left, newParameteres.forDotRef.top, dotRef);

    widthRef.current.style.height = subjectPos.height + 'px';
    heightRef.current.style.width = subjectPos.width + "px";


}

function setLeftTop(left, top, ref) {
    if (left) {
        ref.current.style.left = left + "px";
    }
    if (top) {
        ref.current.style.top = top + "px";
    }
}

function cursorPositionResToParent(parent = { x: null, y: null }, currentCursor = { x: null, y: null }) {
    return { x: currentCursor.x - parent.x, y: currentCursor.y - parent.y };
}











export { selectorWork }