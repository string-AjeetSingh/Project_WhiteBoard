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

function panelOnOffControl(condition = 1, panels = {
    toolPanelFuncs: null, toolSubPanelFuncs: null, pPanelFuncs: null
}) {
    if (condition === 1) {
        panels.toolPanelFuncs.on();
        panels.toolSubPanelFuncs.on();
        panels.pPanelFuncs.off();
    } else if (condition === 2) {
        panels.toolSubPanelFuncs.off();
        panels.toolPanelFuncs.off();
        panels.pPanelFuncs.on();
    }
}



export { isTouchOrMouse, isDarkMode, panelOnOffControl }