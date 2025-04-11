
import express from "express";
import { createServer } from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import cors from 'cors';


import pracRouter from "./src/functionalities/practise/practise.routes.js";
import loginRouter from "./src/functionalities/Login/login.routes.js";
import projectRouter from "./src/functionalities/projects/projects.routes.js"
import projectSocket from "./src/functionalities/projects/projects.socket.js"

import config from "./config.js";
import jwt from "./src/functionalities/jwt/jwt.js";




const app = express();
const server = createServer(app);


// Middleware to serve React build files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'clientBuild')));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Only needed if you're using cookies or auth headers
}));


//Note - Should provide jwt verification to the things that are finalized

app.use('/api', pracRouter);
app.use('/api', loginRouter);
app.use('/api', jwt.verifyJwt, projectRouter);
projectSocket.activeSocket(server);

// Catch-all route to serve the React app for all unknown routes (SPA)
app.get("*", (req, res) => {
  //res.cookie('theJwt', jwt.provideToken(process.env.COOKIE_SECRET));
  res.sendFile(path.join(__dirname, "clientBuild", "index.html"));
});


app.use((req, res) => {
  res.json({
    message: 'Seems No One Interested Here !! '
  })
})

// Start server
const PORT = process.env.PORT || 3500;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
