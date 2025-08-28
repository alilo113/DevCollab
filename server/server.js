import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import code from "./module/code.js";
import { json } from 'express';
import cors from "cors"

app.use(express.json()); // use express.json()
app.use(cors)

mongoose.connect("mongodb://127.0.0.1:27017/codeDB")
  .then(() => console.log("Database connected!!"))
  .catch(err => console.error(err));

const app = express();
const server = createServer(app);

const io = new Server(server, {
    path: "/socket", 
    cors: {
        origin: "http://localhost:5173/",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log("userConnected")

    socket.on("code", async (newCode) => {
        console.log("Received code: ", newCode)

        try {
            const {name, text} = newCode;
            const savedCode = await new code({name, text}).save()

            io.emit("code", savedCode);
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});