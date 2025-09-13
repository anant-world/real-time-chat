
import mongoose from "mongoose"
import dotenx from 'dotenv'



const databaseConnection=()=>{
     mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("mongodb Connected successfully");
        
     }).catch((error)=>{
        console.log(error);
        
     })
}
export default databaseConnection