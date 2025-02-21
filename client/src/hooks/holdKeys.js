import { useState, useRef, useEffect } from "react";

function useHoldKey(elemRef, keyName) {

    const isHoldRef = useRef(false);

    function handleKeyDown(e) {
        // console.log("a key is pressed");
        if (e.key === keyName) {
            // console.log("holded the key ", keyName);
            isHoldRef.current = true;
        }
    }

    function handleKeyUp(e) {

        if (e.key === keyName) {
            // console.log("release the key ", keyName);
            isHoldRef.current = false;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return (() => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        })
    }, [])

    return isHoldRef

}



export { useHoldKey }