import { useState, useEffect } from "react"

function useInnerWidthHeight() {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {

            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener("resize", handleResize);

        // Cleanup function to remove event listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return [width, height];
}

export { useInnerWidthHeight }