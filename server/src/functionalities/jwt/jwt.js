import jwt from 'jsonwebtoken';
import Utils from '../../globalFuntionalities/utils.js';

function verifyJwt(req, res, next) {

    //Check if cookie with token not exists, 
    // response - Advice to call login route of the api to have cookie again with JWT
    if (!req.signedCookies.theJWT) {
        res.status(404).json(Utils.responseJson(['status', 'message'], [false, 'please login first to have the authorization']));
        return;
    }
    //Verify the Token response conditionaly on error OR data.
    else {
        const token = req.signedCookies.theJWT;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json(Utils.responseJson(['status', 'message'], [false, 'err from jwt verification, semmes you are not authorized to use this service']));
                return;
            }
            console.log('the decoded jwt is :  ', decoded);

            res.userData = { email: decoded.email };
            res.status(200).json(Utils.responseJson(['status', 'message'], [true, 'succesfully verified']));
            next();
        })
    }
}

function provideToken(secreat, payload, expiresIn) {
    const token = jwt.sign(payload, secreat, { expiresIn: expiresIn });
    return token;
}

export default { verifyJwt, provideToken };