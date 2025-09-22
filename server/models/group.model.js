import mongoose, { Schema } from "mongoose";
import { user } from "./user.model";
const groupSchema= new Schema({
    groupName:{
        type:String,
        required:true,
        unique: true,
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    members:[{
        type:Schema.Types.ObjectId,
        ref:"user"
    }],
    chats:[{
        type:Schema.Types.ObjectId,
        ref:"chats"
    }],
    avatar:{
        type:"",
        default:""
    }

},{timestamps:true})

export const group= mongoose.model("group",groupSchema) 