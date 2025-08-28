import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import code from "./module/code.js";
import { json } from 'express';
import cors from "cors"

mongoose.connect("mongodb://127.0.0.1:27017/codeDB")
  .then(() => console.log("Database connected!!"))
  .catch(err => console.error(err));

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json()); // use express.json()
app.use(cors)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});