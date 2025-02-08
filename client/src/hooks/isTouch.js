import { useState, useEffect, useRef } from "react";

const useIsTouch = () => {
    const [isTouch, setIsTouch] = useState(0);


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
