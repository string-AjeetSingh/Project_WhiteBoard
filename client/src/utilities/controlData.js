const controlData = {
    getLatestData,
    getLatestAttributeData,
    saveData: (index, svgRef, shapeRef, aCommunication, svgStyleArray, shapeStyleArray, svgAttributeArray, shapeAttributeArray) => {

        //Example of a very beautifull coding, where we thing of use computer processing or conditional exicution of code.
        //But type of this logic can be very complex both in craeting and reading , but introduce a very different way
        //Of coding.

        let newStyle = { empty: true };
        let newAttrib = { empty: true };
        let conditionArray = [svgStyleArray, shapeStyleArray, svgAttributeArray, shapeAttributeArray];
        let conditionFunctionalities = [
            () => {           // index 1 - work for svgStyleArray
                const svgStyle = getLatestData(svgStyleArray, svgRef);
                newStyle.svgElem = { ...svgStyle };
                newStyle.empty = false;

            },
            () => {           // index 2 - work for shapeStyleArray
                const shapeStyle = getLatestData(shapeStyleArray, shapeRef);
                newStyle.shapeElem = { ...shapeStyle };
                newStyle.empty = false;
            },
            () => {           // index 3 - work for svgAttributeArray
                const svgAttribute = getLatestAttributeData(svgAttributeArray, svgRef);
                newAttrib.svgElem = { ...svgAttribute };
                newAttrib.empty = false;
            },
            () => {           // index 4 - work for shapeAttributeArray
                const shapeAttribute = getLatestAttributeData(shapeAttributeArray, shapeRef);
                newAttrib.shapeElem = { ...shapeAttribute };
                newAttrib.empty = false;
            }
        ]

        conditionArray.forEach((item, index) => {
            if (item && item.length > 0) {
                conditionFunctionalities[index]();
            }
        })

        if (!newStyle.empty)
            aCommunication.current.whiteboardData.data[index].style = { ...newStyle };

        if (!newAttrib.empty)
            aCommunication.current.whiteboardData.data[index].attribute = { ...newAttrib };
    }

}

function getLatestData(arrayToWant, elemRef) {

    const computedStyle = { ...getComputedStyle(elemRef.current) };
    const out = {};

    arrayToWant.forEach((item) => {
        out[item] = computedStyle[item];
    })

    return out;
}

function getLatestAttributeData(arrayToWant, elemRef) {
    const attributeData = {};
    arrayToWant.forEach((item) => {
        attributeData[item] = elemRef.current.getAttribute(item);
    })
    return attributeData;
}

export default controlData;