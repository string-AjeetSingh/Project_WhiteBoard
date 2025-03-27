import express from 'express';
import handle from './login.js';

const routes = express.Router();

//Provide jwt for safe communication between client and server
routes.post('/login', handle.provideJwt);
routes.delete('/logout', handle.removeJwt);
routes.get('/tryRegister', handle.tryUserRegister);



export default routes;