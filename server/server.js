import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import Code from './module/code.js';
import cors from 'cors';

const app = express();
const server = createServer(app);

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/codeDB")
  .then(() => console.log("Database connected!!"))
  .catch(err => console.error(err));

// In-memory shared code per session (optional: extend to multiple files)
let currentCode = ""; 

const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Send the current code to the newly connected user
  socket.emit("updateCode", currentCode);

  // Listen for code changes from clients
  socket.on("codeChange", (newCode) => {
    currentCode = newCode; // update shared code
    socket.broadcast.emit("updateCode", newCode); // broadcast to others
  });

  // Optional: Save code to database
  socket.on("saveCode", async ({ name }) => {
    try {
      const savedCode = await new Code({ name, text: currentCode }).save();
      io.emit("codeSaved", savedCode); // notify all users
      console.log("Code saved to DB");
    } catch (err) {
      console.error("Error saving code:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Simple API endpoint
app.get("/", (req, res) => {
  res.json("Hello world");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});