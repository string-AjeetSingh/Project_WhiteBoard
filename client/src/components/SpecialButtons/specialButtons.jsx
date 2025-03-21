import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const borderColors = ["#002f42", "#0a445f", "#3a7188", "#c3daf1"];

const SpecialButton = ({ theName, onClick }) => {
    const [hovered, setHovered] = useState(false);
    const [touched, setTouched] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % borderColors.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.button
            className="relative z-20 border-2 px-14 py-3 h-fit text-screenModeButton dark:text-blue-300  text-3xl rounded-xl overflow-hidden m-3
             transition-colors duration-500 "
            style={{
                borderColor: borderColors[colorIndex],
                backgroundColor: "transparent", // Remove background animation

            }}
            whileHover={!touched ? { scale: 1.1 } : {}}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => !touched && setHovered(true)}
            onMouseLeave={() => {
                !touched && setHovered(false)
            }}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
            onTouchStart={() => {
                setTouched(true);
                setHovered(true);
            }}
            onTouchEnd={() => {
                setTouched(true);
                setTimeout(() => setTouched(false), 300);
                setHovered(false);
            }}
        >
            <motion.span
                className="absolute inset-0 opacity-20 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.5 : 1 }}
                transition={{ duration: 0.3 }}
            />
            <span className="relative">{theName}</span>
        </motion.button>
    );
};

export default SpecialButton;