import jwt from 'jsonwebtoken';
import Utils from '../../globalFuntionalities/utils.js';
import config from '../../../config.js';

async function verifyJwt(req, res, next) {

    //Check if cookie with token not exists, 
    // response - Advice to call login route of the api to have cookie again with JWT

    if (!req.signedCookies.theJWT) {
        res.status(404).json(Utils.responseJson(['status', 'message'], [-1, 'please login first to have the authorization']));
        return;
    }
    else {
        const token = req.signedCookies.theJWT;
        try {


            let decoded = await jwtVerifyAsync(token, config.COOKIE_SECRET);


            // console.log('the decoded jwt is :  ', decoded);

            if (res) {
                res.userData = { ...decoded };
                next();
            }

            else
                return { ...decoded }
            //console.log("succesfully verified the user : ", decoded);
            //res.status(200).json(Utils.responseJson(['status', 'message'], [true, 'succesfully verified']));



        } catch (err) {
            if (err) {
                if (res)
                    res.status(401).json(Utils.responseJson(['status', 'message'], [-2, 'err from jwt verification, semmes you are not authorized to use this service']));
                else
                    console.error('err from jwt verification, semmes you are not authorized to use this service');

            }
        }
    }
}

function provideToken(secreat, payload, expiresIn) {
    const token = jwt.sign(payload, secreat, { expiresIn: expiresIn });
    return token;
}

function jwtVerifyAsync(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}


export default { verifyJwt, provideToken, jwtVerifyAsync };