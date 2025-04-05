import Utils from "../../globalFuntionalities/utils.js";
import supabase from "../../globalFuntionalities/supabase.js";
import useSupabase from "../../globalFuntionalities/myLibraries/useSupabase.js";
import { clientError, supabaseError } from "../../globalFuntionalities/myLibraries/errorClasses.js";

const handle = {
    saveProject: (req, res) => {

        let check = Utils.checkParameter('req.body.data', req);
        if (check !== 1) {
            res.json(Utils.responseJsonTemplate(1, [false, `please provide valid information in body, check : ${check}`]));
        }


        res.json(Utils.responseJsonTemplate(1, [true, 'Hello from the serverl']));

    },
    createProject: async (req, res) => {
        //create projects
        /* 
        -- This should be expected with jwt verification enabled.
        let check = Utils.checkParameter('req.userData.email', req);
        if (check !== 1) 
        res.json(Utils.responseJsonTemplate(1, [false, `not found required data - req.userData.email, problem at : ${check}`]));
        
        */

        try {

            let check = Utils.checkParameter('req.headers.email', req);
            if (check !== 1) {
                throw new clientError(`not found required data - req.headers.email, problem at : ${check}`, 1);
            }

            check = Utils.checkParameter('req.headers.projecttitle', req);
            if (check !== 1) {
                throw new clientError(`not found required data - req.headers.projectTitle, problem at : ${check}`, 2);
            }

            //class instance to work with supabase
            const database = new useSupabase(supabase);

            //get profileid of user

            await database.select('registeredUsers', 'profileid', { filterName: 'eq', column: 'email', value: req.headers.email });
            if (!database.rsp.success) {
                throw new supabaseError(`Error fetching the profileid : ${database.rsp.error}`);
            }

            else if (database.rsp.data === 'empty') {
                throw new supabaseError(`This email user - ${req.headers.email} is not registered, please register first to get service`);
            }

            const profileid = database.rsp.data.profileid;


            //get previous project id
            await database.select('prevdata', 'value', { filterName: 'eq', column: 'name', value: 'projectid' });
            if (!database.rsp.success || database.rsp.data === 'empty') {
                throw new supabaseError(`Error from database query : ${database.rsp.error ? database.rsp.error : 'semmes empty'}`);
            }

            let newProjectId = database.rsp.data.value + 1;


            //update latest projectid no
            await database.update('prevdata', { column: 'name', value: 'projectid' }, { 'value': newProjectId });
            if (!database.rsp.success) {
                throw new supabaseError(`problem with inserting the new projectid : ${database.rsp.error}`);
            }


            //insert the project
            await database.insert('projects', [{ projectid: newProjectId, projectTitle: req.headers.projecttitle, profileid: profileid }]);

            if (!database.rsp.success)
                throw new supabaseError(`error with the database when request project insertion :  ${database.rsp.error}`);

            res.json(Utils.responseJsonTemplate(1, [true, 'successfully inserted the project']));

        } catch (err) {
            if (err instanceof clientError) {
                err.logit();
                res.json(Utils.responseJsonTemplate(1, [false, err.message]));
            } else if (err instanceof supabaseError) {
                res.json(Utils.responseJsonTemplate(1, [false, err.message]));
                err.logit();
            } else {
                console.error('an unexpected error found : ', err);
            }
        }

    },

    deleteProject: async (req, res) => {
        try {

            let check = Utils.checkParameter('req.headers.email', req);
            if (check !== 1)
                throw new clientError(`missing parameter "req.headers.email`);

            check = Utils.checkParameter('req.headers.projectid', req);
            if (check !== 1)
                throw new clientError(`missing paramter "req.headers.projectid`);

            let database = new useSupabase(supabase);
            await database.deleteRow('projects', { column: 'projectid', value: parseInt(req.headers.projectid) });



            if (!database.rsp.success) {
                throw new supabaseError('Error while delete query to server - ' + database.rsp.error);
            }
            else if (database.rsp.success) {
                res.json(Utils.responseJsonTemplate(1, [true, 'succesfull delete the project']));
            }


        } catch (err) {
            if (err instanceof clientError) {
                res.json(Utils.responseJsonTemplate(1, [false, err.message]));
                err.logit();
            } else if (err instanceof supabaseError) {
                res.json(Utils.responseJsonTemplate(1, [false, err.message]));
                err.logit();
            }
            else {
                res.json(Utils.responseJsonTemplate(1, [false, 'Enexpected Error : ' + err.message]));
                console.error('Unexpected Error : ', err);
            }
        }

    }


}





export default handle;