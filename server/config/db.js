import mongoose from "mongoose"


const databaseConnection=()=>{
     mongoose.connect("mongodb://127.0.0.1:27017/atkt").then(()=>{
        console.log("mongodb Connected successfully");
        
     }).catch((error)=>{
        console.log(error);
        
     })
}
export default databaseConnection