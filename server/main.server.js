import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = createServer(app);

// Middleware to serve React build files
app.use(express.static(path.join(__dirname, 'clientBuild')));


// Catch-all route to serve the React app for all unknown routes (SPA)
app.get("*", (req, res) => {
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
