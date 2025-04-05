import { clientError } from "./myLibraries/errorClasses.js";

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

        //iterate over level and return if not exists the obj
        if (!current) {
            return givenArray[0];
        }
        for (let level of levelArray) {
            current = current[level];
            if (!current) {
                return level;
            };


        }
        return 1;


    },
    checkParameters: (array) => {
        //This is a funcionality to check the paramters and 
        // throw respected error messages if any of them appears

        //array must be like [{type : 'obj', subject : object, path : 'aobj.ajeet.value'}, ...]

        for (let item of array) {
            debugger;
            if (item.type === 'obj') {
                let check = checkObj(item.subject, item.path);
                debugger;
                if (check !== 1)
                    throw new clientError(`Parameter error while checking object with level path = ${item.path}, not found at : ${check} `);

            } else {
                if (!item.subject)
                    throw new clientError(`Parameter error while checking varaible = ${item.path}, not found  `);

            }
        }

    }



}


const jsonTemplates = [
    null,
    { templateVariable: ['status', 'message'] }
]

function checkObj(obj, path) {
    let current = obj;
    path = path.split('.');

    debugger;

    for (let i = 0; i < path.length; i++) {
        if (i === 0) {
            debugger;
            if (!current) {

                debugger;
                return path[i];
            }

        } else {
            current = current[path[i]];
            debugger;
            if (!current) {
                debugger;
                return path[i];
            }
        }
    }

    debugger;
    return 1;
}




export default Utils;