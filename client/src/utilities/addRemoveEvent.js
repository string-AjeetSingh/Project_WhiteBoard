function addEvent(refElem, eventtype, callback) {
    refElem.current.addEventListener(eventtype, callback);
}
function removeEvent(refElem, eventtype, callback) {
    refElem.current.removeEventListener(eventtype, callback);
}



export { addEvent, removeEvent };