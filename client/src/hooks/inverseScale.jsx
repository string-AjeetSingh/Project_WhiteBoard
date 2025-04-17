import { CommonContext } from "../myLib/commonContext/myContext";
import { useContext, useState, useRef, useEffect } from "react";
import useNormalizedScale from "./normalizedScale";

function useInverseScale() {
    const [normalizedScale] = useNormalizedScale();
    const [inverse, setScale] = useState(null);

    useEffect(() => {
        console.log('normalizedScale is : ', normalizedScale);
        if (normalizedScale) {
            setScale(1 / normalizedScale);
        }
    }, [normalizedScale])

    return [inverse];
}

export default useInverseScale;