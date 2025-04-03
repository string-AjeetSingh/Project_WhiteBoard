import Utils from "../../globalFuntionalities/utils.js";
import supabase from "../../globalFuntionalities/supabase.js";
import useSupabase from "../../globalFuntionalities/myLibraries/useSupabase.js";

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



        let check = Utils.checkParameter('req.headers.email', req);
        if (check !== 1)
            res.json(Utils.responseJsonTemplate(1, [false, `not found required data - req.headers.email, problem at : ${check}`]));

        check = Utils.checkParameter('req.headers.projecttitle', req);
        if (check !== 1)
            res.json(Utils.responseJsonTemplate(1, [false, `not found required data - req.headers.projectTitle, problem at : ${check}`]));

        //class instance to work with supabase
        const database = new useSupabase(supabase);

        //get profileid of user
        await database.select('registeredUsers', 'profileid', { filterName: 'eq', column: 'email', value: req.headers.email });
        if (!database.rsp.success)
            res.json(Utils.responseJsonTemplate(1, [false, `Error fetching the profileid : ${database.rsp.error}`]))

        else (database.rsp.data === 'empty')
        res.json(Utils.responseJsonTemplate(1, [false, `This email user - ${req.headers.email} is not registered, please register first to get service`]))

        const profileid = database.rsp.data.profileid;
        debugger;

        //get previous project id
        await database.select('prevdata', 'value', { filterName: 'eq', column: 'name', value: 'projectid' });
        if (!database.rsp.success || database.rsp.data === 'empty') {
            res.json(Utils.responseJsonTemplate(1, [false, `Error from database query : ${database.rsp.error ? database.rsp.error : 'semmes empty'}`]));
        }

        let newProjectId = database.rsp.data.value + 1;
        debugger;

        //update latest projectid no
        await database.update('prevdata', { column: 'name', value: 'projectid' }, { 'value': newProjectId });
        if (!database.rsp.success) {
            res.json(Utils.responseJsonTemplate(1, [false, `problem with inserting the new projectid : ${database.rsp.error}`]));
        }
        debugger;




        //insert the project
        await database.insert('projects', [{ projectid: newProjectId, projectTitle: req.headers.projectTitle, profileid: profileid }]);
        debugger;
        if (!database.rsp.success)
            res.json(Utils.responseJsonTemplate(1, [false, `error with the database when request project insertion :  ${database.rsp.error}`]));

        res.json(Utils.responseJsonTemplate(1, [true, 'successfully inserted the project']));


    },




}





export default handle;