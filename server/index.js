import express from 'express';
import connectDB from './config/db.js'; 
import dotenv from 'dotenv';
import databaseConnection from './config/db.js';
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
const app = express();

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

app.use("/api/v1/user",userRoute)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});