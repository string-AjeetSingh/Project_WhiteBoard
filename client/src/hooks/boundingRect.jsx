import { useState, useRef, useEffect } from 'react';

function useBoundingRect(elemRef) {
    const [properties, setProp] = useState({ width: null, height: null, x: null, y: null });
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const lastProp = useRef({ width: null, height: null });


    useEffect(() => {
        //Update width and height states for using only width and height state re-renders
        setWidth(properties.width);
        setHeight(properties.height);
    }, [properties])

    useEffect(() => {
        //Events for tracking.
        let boundingData = elemRef.current.getBoundingClientRect();
        lastProp.current.width = boundingData.width;
        lastProp.current.height = boundingData.height;
        lastProp.current.x = boundingData.x;
        lastProp.current.y = boundingData.y;
        setProp({ ...lastProp.current });


        let inteval = setInterval(() => {
            let boundingData = elemRef.current.getBoundingClientRect();
            let boolSetIt = false;


            for (let key in lastProp.current) {
                if (key !== 'width' && key !== 'height')
                    continue;

                if (lastProp.current[key] !== boundingData[key]) {
                    lastProp.current[key] = boundingData[key];
                    boolSetIt = true;
                }
            }

            if (boolSetIt) {
                console.log("setting the values now");
                setProp({ ...properties }, { ...lastProp.current });
            }

        }, 100)

        return (() => {
            if (inteval) {
                clearInterval(inteval);
            }
        })
    }, [])


    return { properties, width, height, propRef: lastProp };

}




export default useBoundingRect;