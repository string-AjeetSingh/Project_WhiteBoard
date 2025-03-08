class ElementTracker {
    constructor(setState, scaleRef) {
        this.setState = setState;
        this.scaleRef = scaleRef; // External scale reference (default: 100)
        this.element = null;
        this.resizeObserver = null;
        this.mutationObserver = null;
    }

    trackElement(element, type) {
        if (!element || this.element === element) return; // Prevent duplicate tracking
        this.element = element;

        const updateProperties = () => {
            if (!this.element) return;

            const rect = this.element.getBoundingClientRect();
            const computedStyle = { ...getComputedStyle(this.element) };

            // Normalize scale: (100 = normal scale)
            const scale = (this.scaleRef.current || 100) / 100;
            let triangleDimentions = { width: null, height: null };

            if (type === 'triangle') {
                triangleDimentions = getTriangleDimensionsFromPoints(this.element.getAttribute('points'));
            }

            this.setState({
                width: rect.width / scale,
                height: rect.height / scale,
                borderWidth: parseFloat(computedStyle.strokeWidth),
                borderRadius: parseFloat(computedStyle.rx),
                triangleWidth: triangleDimentions.width,
                triangleHeight: triangleDimentions.height,
                rx: parseFloat(computedStyle.rx),
                ry: parseFloat(computedStyle.ry),
                r: parseFloat(computedStyle.r),
                x: rect.x / scale,
                y: rect.y / scale,
                top: rect.top / scale,
                left: rect.left / scale,
                right: rect.right / scale,
                bottom: rect.bottom / scale,
            });
        };

        // Observe size changes
        this.resizeObserver = new ResizeObserver(updateProperties);
        this.resizeObserver.observe(this.element);

        // Observe attribute changes
        this.mutationObserver = new MutationObserver(updateProperties);
        this.mutationObserver.observe(this.element, { attributes: true, childList: true, subtree: true });

        // Initial update
        updateProperties();
    }

    stopTracking() {
        if (this.resizeObserver) this.resizeObserver.disconnect();
        if (this.mutationObserver) this.mutationObserver.disconnect();
        this.element = null;
    }
}

function getTriangleDimensionsFromPoints(points) {
    if (!points) return { width: 0, height: 0 };

    const coords = points.split(" ").map(point => {
        const [x, y] = point.split(",").map(Number);
        return { x, y };
    });

    const minX = Math.min(...coords.map(p => p.x));
    const maxX = Math.max(...coords.map(p => p.x));
    const minY = Math.min(...coords.map(p => p.y));
    const maxY = Math.max(...coords.map(p => p.y));

    return {
        width: maxX - minX,
        height: maxY - minY
    };
}

// Example usage:
const points = "10,10 50,80 90,20";
//console.log(getTriangleDimensionsFromPoints(points));
// Output: { width: 80, height: 70 }


export default ElementTracker;
