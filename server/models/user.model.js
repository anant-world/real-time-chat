import mongoose, { Mongoose, Schema } from "mongoose";
 
const userSchema= new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    groupjoined:[{
        type:Schema.Types.ObjectId,
        ref:"group"
    }],
    groupcreated:[{
        type:Schema.Types.ObjectId,
        ref:"group"
    }]
},
    {timestamps:true})

export const user= mongoose.model("user",userSchema)