import { a } from "framer-motion/client";
import { addEvent, removeEvent } from "./addRemoveEvent";

class drawLogic {
    constructor(parentRef, canvasRef, finalCanvasRef, setCanvas, mousePositionRef, normalizedScale) {
        this.parentRef = parentRef;
        this.canvasRef = canvasRef;
        this.mousePositionRef = mousePositionRef;
        this.normalizedScale = normalizedScale;
        this.context = null;
        this.prevCoor = {
            x: 'undefined', y: 'undefined', minX: null, maxX: null, minY: null, maxY: null
        }
        this.setCanvas = setCanvas;
        this.finalCanvasRef = finalCanvasRef;
        this.newCanvasDimentions = {};
        this.isDrawing = false;
        this.startDrawing = this.startDrawing.bind(this);
        this.draw = this.draw.bind(this);
        this.stopDrawing = this.stopDrawing.bind(this);
        this.calculateMinMaxPoints = this.calculateMinMaxPoints.bind(this);
    }

    startDrawing() {
        this.context = this.canvasRef.current.getContext('2d');
        let parentPos = otherFunctions.getBoundingClientRectRespectToZoomScale(this.normalizedScale, this.canvasRef);

        let drawPos = otherFunctions.positionResToParent(parentPos, { x: this.mousePositionRef.current.x, y: this.mousePositionRef.current.y });

        console.log('the drawStarts from the position : ', drawPos);

        this.context.beginPath();
        this.context.moveTo(drawPos.x, drawPos.y);
        this.isDrawing = true;

        addEvent(this.canvasRef, 'mousemove', this.draw);
        addEvent(this.canvasRef, 'mouseup', this.stopDrawing);

    }
    draw(e) {
        if (!this.isDrawing) return;

        //console.log("drawing at : ", e.offsetX, e.offsetY);
        this.context.lineTo(e.offsetX, e.offsetY);
        this.calculateMinMaxPoints(e.offsetX, e.offsetY);
        // console.log("the prevCoords", this.prevCoor);
        this.context.stroke();
    }
    stopDrawing(e) {
        if (this.isDrawing) {
            this.isDrawing = false;
            this.calibrateDimentionsForNewCanvas();
            removeEvent(this.canvasRef, 'mousemove', this.draw);
            removeEvent(this.canvasRef, 'mouseup', this.stopDrawing);
        } else {
            setTimeout(() => {
                if (this.isDrawing) {
                    this.isDrawing = false;
                    this.calibrateDimentionsForNewCanvas();
                    removeEvent(this.canvasRef, 'mousemove', this.draw);
                    removeEvent(this.canvasRef, 'mouseup', this.stopDrawing);
                }
            }, 3)
        }
    }
    calculateMinMaxPoints(x, y) {
        if (!this.prevCoor.minX) {
            this.prevCoor.minX = x;

        } else {
            this.prevCoor.minX = Math.min(this.prevCoor.minX, x);
        }
        if (!this.prevCoor.minY) {
            this.prevCoor.minY = y;
        } else {
            this.prevCoor.minY = Math.min(this.prevCoor.minY, y);
        }

        if (!this.prevCoor.maxX) {
            this.prevCoor.maxX = x;

        } else {
            this.prevCoor.maxX = Math.max(this.prevCoor.maxX, x);
        }
        if (!this.prevCoor.maxY) {
            this.prevCoor.maxY = y;
        } else {
            this.prevCoor.maxY = Math.max(this.prevCoor.maxY, y);
        }

    }

    calibrateDimentionsForNewCanvas() {
        const dimentions = {};
        dimentions.contentWidth = this.prevCoor.maxX - this.prevCoor.minX;
        dimentions.contentHeight = this.prevCoor.maxY - this.prevCoor.minY;
        dimentions.contentRectCoord = {
            p1: { x: this.prevCoor.minX - 5, y: this.prevCoor.minY - 5 },
            p2: { x: this.prevCoor.maxX + 5, y: this.prevCoor.minY - 5 },
            p3: { x: this.prevCoor.minX - 5, y: this.prevCoor.maxY + 5 },
            p4: { x: this.prevCoor.maxX + 5, y: this.prevCoor.maxY + 5 },
        }

        //insert new canvas
        this.setCanvas(this.finalCanvasRef, dimentions.contentRectCoord.p1.x, dimentions.contentRectCoord.p1.y, dimentions.contentWidth + 10, dimentions.contentHeight + 10, false);
        otherFunctions.checkAndRun(this.finalCanvasRef, 'ready', true, () => {
            const finalContext = this.finalCanvasRef.current.getContext('2d');
            finalContext.drawImage(this.canvasRef.current, dimentions.contentRectCoord.p1.x, dimentions.contentRectCoord.p1.y, dimentions.contentWidth + 10, dimentions.contentHeight + 10, 0, 0, dimentions.contentWidth + 10, dimentions.contentHeight + 10);
        });

        /* 
        
        console.log('prevDimentions : ', this.prevCoor);
        console.log('dimentions calcuated : ', dimentions);
        */

    }

    pushCanvas(callback) {
        this.setCanvas = callback;
    }


}

const otherFunctions = {
    checkAndRun: async (theRef, scropeName, withoutCurrent, callback) => {
        const newData = new Date();
        const startTime = newData.getSeconds();

        const interval = setInterval(() => {
            const newData = new Date();
            const endTime = newData.getSeconds();

            if (endTime - startTime > 3) {    //off when 3 seconds are reached
                clearInterval(interval);
                console.log("end checkAndRun");
            }

            if (withoutCurrent) {
                if (theRef[scropeName] === true) {
                    if (callback) callback();
                    clearInterval(interval);
                }
            } else {
                if (theRef.current[scropeName] === true) {
                    if (callback) callback();
                    clearInterval(interval);
                }
            }
        })
    },
    getBoundingClientRectRespectToZoomScale: (normalizedScale, theRef) => {
        const boundingData = theRef.current.getBoundingClientRect();
        const scaleFactor = normalizedScale.current;

        // Create a new object with scaled values
        const scaledBoundingData = {
            x: boundingData.x / scaleFactor,
            y: boundingData.y / scaleFactor,
            width: boundingData.width / scaleFactor,
            height: boundingData.height / scaleFactor,
            top: boundingData.top / scaleFactor,
            left: boundingData.left / scaleFactor,
            right: boundingData.right / scaleFactor,
            bottom: boundingData.bottom / scaleFactor
        };

        return scaledBoundingData;
    },

    positionResToParent: (parent = { x: null, y: null }, subject = { x: null, y: null }) => {
        return { x: subject.x - parent.x, y: subject.y - parent.y };
    },


}



export { otherFunctions, drawLogic }