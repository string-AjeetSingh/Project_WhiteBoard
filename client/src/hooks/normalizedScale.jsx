import { CommonContext } from "../myLib/commonContext/myContext";
import { useContext, useState, useRef, useEffect } from "react";



function useNormalizedScale() {
    const { aCommunication } = useContext(CommonContext);
    const [normalizedScale, setScale] = useState(null);

    useEffect(() => {

        let prevValue = null
        let interval = null;
        let interval2 = null;
        let checkBool = false;

        interval = setInterval(() => {

            if (aCommunication.current.prevScale) {
                prevValue = aCommunication.current.prevScale.current;
                setScale(aCommunication.current.prevScale.current / 100);
                clearInterval(interval);

                interval2 = setInterval(() => {
                    if (aCommunication.current.prevScale.current !== prevValue) {
                        //update the normalized value and prevvalue
                        setScale(aCommunication.current.prevScale.current / 100);
                        prevValue = aCommunication.current.prevScale.current;

                    }
                }, 100)
            }
            if (!checkBool) {
                setTimeout(() => {
                    if (!aCommunication.current.prevScale) {
                        clearInterval(interval);
                        console.error('Unable to find the prevScale from the aCommunication');
                    }
                }, 5000)
                checkBool = true;
            }
        }, 0)

        return (() => {
            if (interval) {
                clearInterval(interval);
            }
            if (interval2) {
                clearInterval(interval2);
            }
        })
    }, [])

    return [normalizedScale];
}


export default useNormalizedScale;