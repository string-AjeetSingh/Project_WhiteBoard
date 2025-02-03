import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

// Middleware to serve React build files
const __dirname = path.resolve();
app.use(express.static("/clientBuild/"));

// Real-time collaboration using Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");

  // Example event for real-time updates
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);  // Broadcast the drawing to others
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Catch-all route to serve the React app for all unknown routes (SPA)
app.get("/", (req, res) => {
  res.sendFile(path.join("/clientBuild", "index.html"));
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
