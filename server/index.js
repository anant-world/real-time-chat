import express from 'express';
import connectDB from './config/db.js'; 
import dotenv from 'dotenv';
import databaseConnection from './config/db.js';
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import { Server } from 'socket.io';
import http from "http"


const app = express();
const server = http.createServer(app)

dotenv.config();
databaseConnection();
app.use(express.urlencoded({extended:true}))


app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:"*",Credential:true
}
app.use(cors(corsOption))


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello i am coming from Backend",
        success:true
    })
})

const io = new Server(server, {cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }})

  io.on("connection", (socket) => {
    console.log("Socket Connected -> ", socket.id)

    socket.on("message", (msg) => {
        socket.broadcast.emit("new-message", msg)
    })
    socket.on("group-message", (msg) => {
        socket.broadcast.emit("group-new-message", msg)
    })
  })

app.use("/api/v1/user",userRoute)



server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});