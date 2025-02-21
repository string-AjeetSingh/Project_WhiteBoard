function isTouchOrMouse(isTouch, theRef) {
    if (isTouch === 1 && theRef.current) {
        return "touch";
    } else if (isTouch === -1 && theRef.current) {
        return "mouse";
    } else {
        return 0;
    }
}

function isDarkMode() {
    if (localStorage.getItem("screenMode") === "dark") {
        return "dark";
    } else if (localStorage.getItem("screenMode") === "light") {
        return "light";
    }
}



export { isTouchOrMouse, isDarkMode }