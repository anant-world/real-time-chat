import mongoose, { Schema } from "mongoose";
import { user } from "./user.model";
const groupSchema= new Schema({
    groupId:{
        type:String,
        required:true,
        unique:true
    },
    groupName:{
        type:String,
        required:true
    },
    admin:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    member:[{
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