import { useEffect, useState, useRef } from "react";


function useMouseMovement() {

    const [position, setPosition] = useState({ x: null, y: null });
    const positionRef = useRef({ x: null, y: null });

    function handleMouseMovement(e) {
        setPosition({ x: e.clientX, y: e.clientY });
        positionRef.current = { x: e.clientX, y: e.clientY };
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMovement)
        return (() => {
            window.removeEventListener('mousemove', handleMouseMovement)

        })
    }, [])

    return [position, positionRef];
}


export { useMouseMovement }