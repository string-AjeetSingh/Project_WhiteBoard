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
    },
    checkParameter: (toCheck, obj) => {
        let givenArray = toCheck.split(".");
        let levelArray = givenArray.slice(1);
        let current = obj;
        let count = 0;

        //iterate over level and return if not exists the obj
        if (!current) {
            return givenArray[0];
        }
        for (let level of levelArray) {
            debugger;
            current = current[level];
            if (!current) {
                return level;
            };


        }
        return 1;


    }


}

const jsonTemplates = [
    null,
    { templateVariable: ['status', 'message'] }
]



export default Utils;