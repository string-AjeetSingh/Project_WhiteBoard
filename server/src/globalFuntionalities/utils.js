const Utils = {

    responseJson: (keyArray, valueArray) => {
        const thelength = keyArray.length;
        const returnObj = {};

        for (let index = 0; index < thelength; index++) {
            if (!keyArray[index]) continue;
            returnObj[keyArray[index]] = valueArray[index];
        }

        return returnObj;
    },
    responseJsonTemplate: (templateNo, valueArray) => {
        const response = {};
        if (!templateNo) throw new Error('please provide template no in responseJsonTemplate, should no > 0');

        jsonTemplates[templateNo].templateVariable.forEach((val, index) => {
            response[val] = valueArray[index]
        })

        return response;
    }

}

const jsonTemplates = [
    null,
    { templateVariable: ['status', 'message'] }
]



export default Utils;