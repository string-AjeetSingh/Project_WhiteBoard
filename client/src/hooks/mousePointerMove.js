import { useEffect, useState, useRef } from "react";


function useMouseMovement(prevScale, baseScale = 100) {

    const [position, setPosition] = useState({ x: null, y: null });
    const positionRef = useRef({ x: null, y: null });
    const normalizeScale = useRef(null);

    calculateNormalizeScale();

    function calculateNormalizeScale() {
        if (prevScale)
            normalizeScale.current = prevScale.current / baseScale;
    }

    function handleMouseMovement(e) {
        calculateNormalizeScale();

        if (normalizeScale.current) {
            const scaleNormalize = normalizeScale.current;
            setPosition({ x: e.clientX, y: e.clientY });
            positionRef.current = { x: e.clientX / scaleNormalize, y: e.clientY / scaleNormalize };

        } else {
            setPosition({ x: e.clientX, y: e.clientY });
            positionRef.current = { x: e.clientX, y: e.clientY };
        }


    }

    useEffect(() => {
        if (!prevScale)
            console.warn("No prevScale Ref to the useMouseMovement hook, Unable to calculate the normalizedScale");
    }, [prevScale])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMovement)
        return (() => {
            window.removeEventListener('mousemove', handleMouseMovement)

        })
    }, [])



    return [position, positionRef, normalizeScale];
}


export { useMouseMovement }