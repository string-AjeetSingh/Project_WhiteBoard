import { useState, useEffect, useRef } from "react";

const useIsTouch = (theRef) => {
    const [isTouch, setIsTouch] = useState(0);

    if (!theRef) {
        throw new Error('Please provdie a ref of elem in useIgnoreMouseAfterTouch hook');
    }

    useEffect(() => {

        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            setIsTouch(1)
        } else {
            setIsTouch(-1)
        }

    }, []);

    return isTouch;
};

export { useIsTouch };
