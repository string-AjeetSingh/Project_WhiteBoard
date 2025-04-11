import Utils from "../../globalFuntionalities/utils.js";
import supabase from "../../globalFuntionalities/supabase.js";
import useSupabase from "../../globalFuntionalities/myLibraries/useSupabase.js";
import { clientError, supabaseError } from "../../globalFuntionalities/myLibraries/errorClasses.js";

const handle = {
    saveProject: async (req, res) => {

        try {

            Utils.checkParameters([{ type: 'obj', path: "req.body", subject: req }, { type: 'obj', path: "req.headers.projectid", subject: req }, { type: 'obj', path: "res.userData.profileid", subject: res }]);


            const database = new useSupabase(supabase);

            //check if the project exists
            await database.select('projects', "projectid", { filterName: 'eq', column: "projectid", value: parseInt(req.headers.projectid) });

            if (!database.rsp.success)
                throw new supabaseError('Error while fetching the project from the server :', database.rsp.error);
            else if (database.rsp.data === 'empty')
                throw new supabaseError(`Porject id - ${req.headers.projectid} not found in server, please create project and then try again `);

            //Check if use have the reqested project
            await database.select('projects', 'projectid', { filterName: 'eq', column: "profileid", value: parseInt(res.userData.profileid) });

            if (!database.rsp.success)
                throw new supabaseError('Error white fetching profileid about the project, with projectid - ' + req.headers.projectid + ", error : " + database.rsp.error);

            if (database.rsp.data === 'empty')
                throw new supabaseError("User do not have the project, project id - " + req.headers.projectid);

            //Insert data to the server 
            await database.update('projects', { column: 'projectid', value: parseInt(req.headers.projectid) }, { data: req.body });
            if (!database.rsp.success)
                throw new supabaseError(`Error white inserting the data to project, for projectid ${req.headers.projectid} : ${database.rsp.error}`);

            res.status(200).json(Utils.responseJsonTemplate(1, [1, 'Seems the data must be updated to the project at project id : ' + projectid]));

        } catch (error) {
            if (error instanceof clientError) {
                res.json(Utils.responseJsonTemplate(1, [-1, error.message]));
                error.logit();
            } else if (error instanceof supabaseError) {
                res.json(Utils.responseJsonTemplate(1, [-2, error.message]));
                error.logit();
            }
            else {
                res.json(Utils.responseJsonTemplate(1, [-3, 'Unexpected Error : ' + error.message]))
                console.error("Unexpected error : ", error);
            }
        }


    },
    saveProject2: async (data, projectid, profileid, ws) => {

        try {

            Utils.checkParameters([{ path: "data", subject: data }, { path: "projectid", subject: projectid }, { path: "profileid", subject: profileid }]);


            const database = new useSupabase(supabase);

            //check if the project exists
            await database.select('projects', "projectid", { filterName: 'eq', column: "projectid", value: parseInt(projectid) });

            if (!database.rsp.success)
                throw new supabaseError('Error while fetching the project from the server :', database.rsp.error);
            else if (database.rsp.data === 'empty')
                throw new supabaseError(`Porject id - ${projectid} not found in server, please create project and then try again `);

            //Check if use have the reqested project
            await database.select('projects', 'projectid', { filterName: 'eq', column: "profileid", value: parseInt(profileid) });

            if (!database.rsp.success)
                throw new supabaseError('Error white fetching profileid about the project, with projectid - ' + projectid + ", error : " + database.rsp.error);

            if (database.rsp.data === 'empty')
                throw new supabaseError("User do not have the project, project id - " + projectid);

            //Insert data to the server 
            await database.update('projects', { column: 'projectid', value: parseInt(projectid) }, { data: data });
            if (!database.rsp.success)
                throw new supabaseError(`Error white inserting the data to project, for projectid ${projectid} : ${database.rsp.error}`);

            ws.send(JSON.stringify([1, 'Seems the data must be updated to the project at project id : ' + projectid]));

        } catch (error) {
            if (error instanceof clientError) {
                ws.send(JSON.stringify(Utils.responseJsonTemplate(1, [-1, error.message])))
                error.logit();
            } else if (error instanceof supabaseError) {
                ws.send(JSON.stringify(Utils.responseJsonTemplate(1, [-2, error.message])))
                error.logit();
            }
            else {
                ws.send(JSON.stringify(Utils.responseJsonTemplate(1, [-3, 'Unexpected Error : ' + error.message])));
                console.error("Unexpected error : ", error);
            }
        }
    },
    createProject: async (req, res) => {

        try {

            let check = Utils.checkParameter('res.userData.email', res);
            if (check !== 1) {
                throw new clientError(`not found required data - res.userData.email, problem at : ${check}`, 1);
            }

            check = Utils.checkParameter('req.headers.projecttitle', req);
            if (check !== 1) {
                throw new clientError(`not found required data - req.headers.projectTitle, problem at : ${check}`, 2);
            }

            //class instance to work with supabase
            const database = new useSupabase(supabase);

            //get profileid of user

            await database.select('registeredUsers', 'profileid', { filterName: 'eq', column: 'email', value: res.userData.email });
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

            if (!database.rsp.success) {

                if (database.rsp.errorType === 'uniqueConflict') {
                    throw new supabaseError(`Already Exists the project:  ${req.headers.projecttitle}`, 'alreadyExists');

                } else {
                    throw new supabaseError(`error with the database when request project insertion :  ${database.rsp.error}`);
                }
            }

            res.json(Utils.responseJsonTemplate(1, [1, 'successfully inserted the project']));

        } catch (err) {
            if (err instanceof clientError) {
                res.json(Utils.responseJsonTemplate(1, [-1, err.message]));
                err.logit();
            } else if (err instanceof supabaseError) {
                if (err.type === 'alreadyExists') {
                    res.json(Utils.responseJsonTemplate(1, [2, err.message]));
                    err.logit();
                }

                res.json(Utils.responseJsonTemplate(1, [-1, err.message]));
                err.logit();
            } else {
                console.error('an unexpected error found : ', err);
            }
        }

    },

    deleteProject: async (req, res) => {
        try {
            let check = Utils.checkParameter('req.headers.projectid', req);
            if (check !== 1)
                throw new clientError(`missing paramter "req.headers.projectid`);

            let database = new useSupabase(supabase);
            await database.deleteRow('projects', { column: 'projectid', value: parseInt(req.headers.projectid) });



            if (!database.rsp.success) {
                throw new supabaseError('Error while delete query to server - ' + database.rsp.error);
            }
            else if (database.rsp.success) {
                res.status(200).json(Utils.responseJsonTemplate(1, [1, 'succesfull delete the project']));
            }


        } catch (err) {
            if (err instanceof clientError) {
                res.json(Utils.responseJsonTemplate(1, [-1, err.message]));
                err.logit();
            } else if (err instanceof supabaseError) {
                res.json(Utils.responseJsonTemplate(1, [-2, err.message]));
                err.logit();
            }
            else {
                res.json(Utils.responseJsonTemplate(1, [false, 'Enexpected Error : ' + err.message]));
                console.error('Unexpected Error : ', err);
            }
        }

    },

    fetchProject: async (req, res) => {
        try {

            Utils.checkParameters([{ type: 'obj', path: 'req.headers.projectid', subject: req }, { type: 'obj', path: 'res.userData.profileid', subject: res }]);

            const database = new useSupabase(supabase);

            //Check if use have the reqested project
            await database.select('projects', 'projectid', { filterName: 'eq', column: "profileid", value: parseInt(res.userData.profileid) });

            if (!database.rsp.success)
                throw new supabaseError('Error white fetching profileid about the project, with projectid - ' + req.headers.projectid + ", error : " + database.rsp.error);

            if (database.rsp.data === 'empty')
                throw new supabaseError("User do not have the project, project id - " + req.headers.projectid);

            //Fetching the projet 
            await database.select('projects', '*', { filterName: 'eq', column: "projectid", value: parseInt(req.headers.projectid) });

            if (!database.rsp.success)
                throw new supabaseError('Error white fetching * about the project, with projectid - ' + req.headers.projectid + ", error : " + database.rsp.error);

            if (database.rsp.data === 'empty')
                throw new supabaseError("Project Not Found, project id - " + req.headers.projectid);

            res.json(Utils.responseJsonTemplate(2, [1, "Succesfully get data", database.rsp.data]));

        } catch (error) {
            if (error instanceof clientError) {
                res.json(Utils.responseJsonTemplate(1, [-1, error.message]))
                error.logit();
            } else if (error instanceof supabaseError) {
                res.json(Utils.responseJsonTemplate(1, [-2, error.message]))
                error.logit();
            }
            else {
                res.json(Utils.responseJsonTemplate(1, [false, 'Unexpected Error : ' + error.message]));
                console.error('Unexpected error : ', error);
            }
        }
    },

    fetchAllProjects: async (req, res) => {
        try {

            Utils.checkParameters([{ type: 'obj', path: 'res.userData.profileid', subject: res }]);

            const database = new useSupabase(supabase);
            database.responseDataAsArray();
            await database.select('projects', '*', { filterName: 'eq', column: "profileid", value: parseInt(res.userData.profileid) });

            if (!database.rsp.success)
                throw new supabaseError('Error white fetching * about the project, with profileid- ' + res.userData.profileid + ", error : " + database.rsp.error);

            if (database.rsp.data === 'empty')
                throw new supabaseError("No project for , profileid - " + res.userData.profileid);

            res.status(200).json(Utils.responseJsonTemplate(2, [true, "Succesfully get data", database.rsp.data]));

        } catch (error) {
            if (error instanceof clientError) {
                res.json(Utils.responseJsonTemplate(1, [false, error.message]))
                error.logit();
            } else if (error instanceof supabaseError) {
                res.json(Utils.responseJsonTemplate(1, [false, error.message]))
                error.logit();
            }
            else {
                res.json(Utils.responseJsonTemplate(1, [false, 'Unexpected Error : ' + error.message]));
                console.error('Unexpected error : ', error);
            }
        }
    },
    ifProjectExists: async (req, res) => {
        try {

            Utils.checkParameters([{ type: 'obj', path: 'req.headers.projecttitle', subject: req }]);

            const database = new useSupabase(supabase);

            await database.select('projects', 'projectTitle', { filterName: 'eq', column: "projectTitle", value: req.headers.projecttitle });

            if (!database.rsp.success)
                throw new supabaseError('Error white fetching projecttitle about the project, with projecttitle - ' + req.headers.projecttitle + ", error : " + database.rsp.error);

            if (database.rsp.data === 'empty') {

                console.log("Project not found with title :  " + req.headers.projecttitle);
                res.status(200).json({ status: true, exists: false });
                return;
            }


            console.log("Project found with title :  " + req.headers.projecttitle);
            res.status(200).json({ status: true, exists: true });

        } catch (error) {
            if (error instanceof clientError) {
                res.json(Utils.responseJsonTemplate(1, [false, error.message]))
                error.logit();
            } else if (error instanceof supabaseError) {
                res.json(Utils.responseJsonTemplate(1, [false, error.message]))
                error.logit();
            }
            else {
                res.json(Utils.responseJsonTemplate(1, [false, 'Unexpected Error : ' + error.message]));
                console.error('Unexpected error : ', error);
            }
        }
    },



}





export default handle;