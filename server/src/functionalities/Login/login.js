
import Utils from "../../globalFuntionalities/utils.js";
import jwt from "../jwt/jwt.js";
import supabase from "../../globalFuntionalities/supabase.js";
import useSupabase from "../../globalFuntionalities/myLibraries/useSupabase.js";
import enviroment from "../../../config.js"



const handle = {
    provideJwt: async (req, res) => {
        let header = null;


        //check if userData header is in the req containing email of user from 0auth and parse json 
        if (req.headers?.userdata) {
            header = JSON.parse(req.headers.userdata);
            console.log('the req. headers are  : ', header);
        }
        //Response negative if not found the userData
        else {
            res.json(Utils.responseJson(['status', 'message'], [-1, 'Please provide userdata.email in req headers']));
            return;
        }

        //Set cookie, a JWT token containing the email set for 24 hours.
        let out = await registerUser(header.email);

        if (out.status === 1) {
            console.log('succesfully registered user');
            res.cookie('theJWT', jwt.provideToken(enviroment.COOKIE_SECRET, { email: header.email, profileid: out.data.profileid }, '24h'), { signed: true, maxAge: 3600000 * 24, httpOnly: true }); //24 hour
            res.status(200).json(Utils.responseJson(['status', 'message', 'data'], [1, 'succesfully registered user', out.data]));
            return;
        } else if (out.status === 2) {
            console.log('already registered');
            res.cookie('theJWT', jwt.provideToken(enviroment.COOKIE_SECRET, { email: header.email, profileid: out.data.profileid }, '24h'), { signed: true, maxAge: 3600000 * 24, httpOnly: true }); //24 hour
            res.status(200).json(Utils.responseJson(['status', 'message', 'data'], [2, 'already registered user', out.data]));
            return;
        }
        res.json(Utils.responseJson(['status', 'message'], [-1, 'a problem in login ']));
    },
    removeJwt: async (req, res) => {

        //If cookies exists remove the cookie to make user logout.
        if (req.signedCookies.theJWT) {
            console.log('attemp to clear cookie');
            res.clearCookie("theJWT", { signed: true });
            res.status(200).json(Utils.responseJson(['status', 'message'], [true, 'Perfectly logout from the server']))
        } else {
            console.log('No cookie found to delete');
            res.status(404).json(Utils.responseJsonTemplate(1, [false, 'not found any cookie on the server']));
        }
    },
    tryUserRegister: async (req, res) => {
        if (req.headers.email) {
            let out = await registerUser(req.headers.email);
            if (out === 1) {
                res.status(200).json(Utils.responseJson(['status', 'message'], [true, 'succesfully registered user']));
                return;
            } else if (out === 2) {
                console.log('already registered');
                res.status(200).json(Utils.responseJson(['status', 'message'], [true, 'already registered user']));
                return;
            }
        } else {
            res.status(404).json(Utils.responseJson(1, [false, 'No email found in header']));
        }
    }


}

async function registerUser(email) {

    if (!email) throw new Error('Missing parameters for registerUser function');

    const theSupabase = new useSupabase(supabase);

    //Check email from server
    const prevEmail = await theSupabase.select('registeredUsers', 'email, profileid', { filterName: 'eq', column: 'email', value: email });

    if (!prevEmail.success) {
        return -1;
    }

    console.log('the prevEmail :', prevEmail);

    //if email not registered
    if (prevEmail.data === 'empty') {
        let prev = await theSupabase.select('prevdata', 'value', { filterName: 'eq', column: 'name', value: 'profileid' });
        let newNo = null;

        if (prev.data !== "empty" || prev.success) {
            newNo = prev.data.value + 1;
            console.log('the prev is : ', prev, "and new value :", newNo);
        } else {
            console.error('Error : In return value to query the supabase for prevdata.name');
            return false;
        }

        const updatePrevValue = await theSupabase.update('prevdata', { column: 'name', value: 'profileid' }, { 'value': newNo });
        if (!updatePrevValue.success) throw new Error('error updating the prevValue : ', updatePrevValue.error);

        //inset registry in the data base
        await theSupabase.insert('registeredUsers', [{ email: email, profileid: newNo }]);
        if (!theSupabase.rsp.success) throw new Error('error insreting the email : ', theSupabase.rsp.error);

        await theSupabase.insert('userProfile', [{ profileid: newNo }]);
        if (!theSupabase.rsp.success) throw new Error('error insreting the userProfile profileid : ', theSupabase.rsp.error);


        return { status: 1, data: { profileid: newNo } };


        ///If email registered already
    } else {
        return { status: 2, data: { ...theSupabase.rsp.data } };
    }

}


export default handle;