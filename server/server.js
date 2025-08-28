import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import code from "./module/code.js";
import cors from "cors";

const app = express(); 
const server = createServer(app);

// middlewares
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/codeDB")
  .then(() => console.log("Database connected!!"))
  .catch(err => console.error(err));

const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("code", async (newCode) => {
    console.log("Received code: ", newCode);

    try {
      const { name, text } = newCode;
      const savedCode = await new code({ name, text }).save();

      io.emit("code", savedCode);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
    res.json("Hello wolrd")
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});