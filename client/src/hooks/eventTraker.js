import { useState, useRef, useEffect, useCallback } from "react";


function useEventTracker() {
    const [eventDetail, seteventDetail] = useState({ name: null, type: null, index: null });
    const [callBackRun, setcallBackRun] = useState([])

    const trackEvent = useCallback((name, type, index = null) => {
        seteventDetail({ name: name, type: type, index: index });
    }, [])

    const callbackOnEventDetail = (targetName, eventName, index, callback) => {
        setcallBackRun((Prev) => {
            let newOne = Prev.slice();
            newOne.push({ name: targetName, type: eventName, index: index, callback: callback });
        })
    }


    useEffect(() => {
        callBackRun.forEach((val) => {
            if (eventDetail.name === val.name && eventDetail.type === val.type && eventDetail.index === val.index) {
                val.callback();
            }
        })
    }, [eventDetail, callBackRun])

    return [trackEvent, eventDetail, callbackOnEventDetail]
}


export { useEventTracker }