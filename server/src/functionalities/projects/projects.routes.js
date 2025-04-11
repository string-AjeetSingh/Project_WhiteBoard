import express from 'express'
import handle from './projects.js';


const routes = express.Router();
//routes for porjects.
routes.put("/saveProject", handle.saveProject);
routes.post("/createProject", handle.createProject);
routes.delete("/removeProject", handle.deleteProject);
routes.get("/fetchProject", handle.fetchProject);
routes.get("/fetchAllProjects", handle.fetchAllProjects);
routes.get("/ifProjectExists", handle.ifProjectExists);


export default routes;