import { useEffect, useState, useRef } from "react";


function useMouseMovement(prevScale, baseScale = 100) {

    const [position, setPosition] = useState({ x: null, y: null });
    const positionRef = useRef({ x: null, y: null });
    const normalizeScale = useRef(null);

    normalizeScale.current = prevScale.current / baseScale;

    function handleMouseMovement(e) {
        normalizeScale.current = prevScale.current / baseScale;


        const scaleNormalize = prevScale.current / baseScale;
        setPosition({ x: e.clientX, y: e.clientY });
        positionRef.current = { x: e.clientX / scaleNormalize, y: e.clientY / scaleNormalize };

    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMovement)
        return (() => {
            window.removeEventListener('mousemove', handleMouseMovement)

        })
    }, [])

    return [position, positionRef, normalizeScale];
}


export { useMouseMovement }