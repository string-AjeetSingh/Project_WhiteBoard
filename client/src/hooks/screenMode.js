import { useEffect, useContext, useState, useRef } from "react";
import { CommonContext } from "../myLib/commonContext/myContext";

function useScreenMode() {
    const [screenMode, setScreenMode] = useState(null);
    const screenModeRef = useRef(null);
    const { aCommunication } = useContext(CommonContext);
    const prevValue = useRef('');

    useEffect(() => {

        let interval = setInterval(() => {
            if (aCommunication.current.screenMode !== prevValue.current) {
                setScreenMode(aCommunication.current.screenMode);
                prevValue.current = aCommunication.current.screenMode;
            }
        }, 0)
        return (() => {
            if (interval) {
                clearInterval(interval);
            }
        })
    }, [])

    return [screenMode];
}

export default useScreenMode;