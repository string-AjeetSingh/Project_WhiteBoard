import { useState, useRef, useEffect, useCallback } from "react";


function useEventTracker() {
    const [eventDetail, seteventDetail] = useState({ name: null, type: null, index: null });

    const trackEvent = useCallback((name, type, index = null) => {
        seteventDetail({ name: name, type: type, index: index });
    }, [])
    return [trackEvent, eventDetail]
}


export { useEventTracker }