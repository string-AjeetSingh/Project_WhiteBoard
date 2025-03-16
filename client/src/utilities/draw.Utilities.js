
import { addEvent, removeEvent } from "./addRemoveEvent";

class drawLogic {
    constructor(parentRef, canvasRef, finalCanvasRef, setCanvas, setRoughCanvas, mousePositionRef, normalizedScale) {
        this.parentRef = parentRef;
        this.canvasRef = canvasRef;
        this.mousePositionRef = mousePositionRef;
        this.normalizedScale = normalizedScale;
        this.context = null;
        this.prevCoor = {
            x: 'undefined', y: 'undefined', minX: null, maxX: null, minY: null, maxY: null
        }
        this.setCanvas = setCanvas;
        this.setRoughCanvas = setRoughCanvas;
        this.finalCanvasRef = finalCanvasRef;
        this.newCanvasDimentions = {};
        this.isDrawing = false;
        this.penStyle = {
            stroke: 'black',
            width: 1,
            shadowColor: "rgba(0, 0, 0, 0)",
            shadowBlue: 0,
            lineCap: 'butt',
            lineJoin: 'miter',

        }
        /* 
        ctx.globalCompositeOperation = "source-over"; // Default mode (draw normally)
ctx.lineCap = "round"; // Smooth stroke endings
ctx.lineJoin = "round"; // Smooth connection between strokes
ctx.lineWidth = 2; // Pen thickness (adjust as needed)
ctx.strokeStyle = "#000000"; // Pen color (black, change as needed)
ctx.shadowColor = "rgba(0, 0, 0, 0.2)"; // Soft shadow for depth
ctx.shadowBlur = 1; // Slight blur for smoothness

        */
        this.penProfil = {
            selected: 2,
            profile: [null,
                {
                    shadowColor: "rgba(0, 0, 0, 0)",
                    shadowBlur: 0,
                    lineCap: "butt",
                    lineJoin: "miter",

                },
                {
                    shadowColor: "rgba(80, 120, 90, 0.5)",
                    shadowBlur: 3,
                    lineCap: "round",
                    lineJoin: "round",

                },
            ]
        }

        //Bind methods for out of scope sharing
        this.startDrawing = this.startDrawing.bind(this);
        this.draw = this.draw.bind(this);
        this.stopDrawing = this.stopDrawing.bind(this);
        this.calculateMinMaxPoints = this.calculateMinMaxPoints.bind(this);
        this.engagePenStyle = this.engagePenStyle.bind(this);
        this.selectPenStyle = this.selectPenStyle.bind(this);
    }

    engagePenStyle() {

        if (this.context) {
            this.context.lineWidth = this.penStyle.width;
            this.context.strokeStyle = this.penStyle.stroke;


            //select pen propeties per penProfile selected.
            if (this.penProfil.selected > 0 && this.penProfil.selected < 3) {        //available pen selecte number 
                this.context.lineCap = this.penProfil.profile[this.penProfil.selected].lineCap;
                this.context.lineJoin = this.penProfil.profile[this.penProfil.selected].lineJoin;
                this.context.shadowColor = this.penProfil.profile[this.penProfil.selected].shadowColor;
                this.context.shadowBlur = this.penProfil.profile[this.penProfil.selected].shadowBlur;
            }


        }
    }


    selectPenStyle(lineWidth, strokeColor, profileNumber) {
        if (lineWidth) this.penStyle.width = lineWidth;
        if (strokeColor) this.penStyle.stroke = strokeColor;

        if (profileNumber > 0 && profileNumber < 3 && typeof profileNumber === 'number') {

            this.penProfil.selected = profileNumber;
        } else {
            console.warn("please provide number less than 3 and more than 0 pen profile number to get effect");
        }

    }

    startDrawing() {
        this.context = this.canvasRef.current.getContext('2d');
        let parentPos = otherFunctions.getBoundingClientRectRespectToZoomScale(this.normalizedScale, this.canvasRef);

        let drawPos = otherFunctions.positionResToParent(parentPos, { x: this.mousePositionRef.current.x, y: this.mousePositionRef.current.y });

        // console.log('the drawStarts from the position : ', drawPos);

        this.context.beginPath();
        this.engagePenStyle();
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

            //Remove Rough Canvas
            this.setRoughCanvas(null);

        });

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