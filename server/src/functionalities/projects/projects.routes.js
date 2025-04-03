import express from 'express'
import handle from './projects.js';


const routes = express.Router();
//routes for porjects.
routes.put("/saveProject", handle.saveProject);
routes.post("/createProject", handle.createProject);
//routes.delete("/removeProject", );


export default routes;