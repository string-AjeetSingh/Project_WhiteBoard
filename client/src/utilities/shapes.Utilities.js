import controlData from "./controlData";

const eventHandles = {
    useSelector: (selector, svgRef, svgElemRef, name, index, saveFlag) => {

        selector.current.select(svgRef, svgElemRef, name, index, saveFlag);

    }

}

const otherFunctions = {
    saveData: (index, svgRef, shapeRef, aCommunication, svgStyleArray, shapeStyleArray, svgAttributeArray, shapeAttributeArray) => {

        //Example of a very beautifull coding, where we thing of use computer processing or conditional exicution of code.
        //But type of this logic can be very complex both in craeting and reading , but introduce a very different way
        //Of coding.

        let newStyle = { empty: true };
        let newAttrib = { empty: true };
        let conditionArray = [svgStyleArray, shapeStyleArray, svgAttributeArray, shapeAttributeArray];
        let conditionFunctionalities = [
            () => {           // index 1 - work for svgStyleArray
                const svgStyle = controlData.getLatestData(svgStyleArray, svgRef);
                newStyle.svgElem = { ...svgStyle };
                newStyle.empty = false;

            },
            () => {           // index 2 - work for shapeStyleArray
                const shapeStyle = controlData.getLatestData(shapeStyleArray, shapeRef);
                newStyle.shapeElem = { ...shapeStyle };
                newStyle.empty = false;
            },
            () => {           // index 3 - work for svgAttributeArray
                const svgAttribute = controlData.getLatestAttributeData(svgAttributeArray, svgRef);
                newAttrib.svgElem = { ...svgAttribute };
                newAttrib.empty = false;
            },
            () => {           // index 4 - work for shapeAttributeArray
                const shapeAttribute = controlData.getLatestAttributeData(shapeAttributeArray, shapeRef);
                newAttrib.shapeElem = { ...shapeAttribute };
                newAttrib.empty = false;
            }
        ]

        conditionArray.forEach((item, index) => {
            if (item.length > 0) {
                conditionFunctionalities[index]();
            }
        })

        if (!newStyle.empty)
            aCommunication.current.whiteboardData.data[index].style = { ...newStyle };

        if (!newAttrib.empty)
            aCommunication.current.whiteboardData.data[index].attribute = { ...newAttrib };
    },
    checkIfStyleParameterDoesNotExists: (theObject, inStyleKey, keyArray) => {

        keyArray.forEach((item) => {
            if (!theObject.style[inStyleKey][item]) {
                throw new Error(`prevData of shapes , missing the values, key : ${inStyleKey}.${item}`);
            }
        })

    },






}









export { eventHandles, otherFunctions }