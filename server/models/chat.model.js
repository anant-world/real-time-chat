import mongoose, { Mongoose, Schema } from "mongoose";
import { group } from "./group.model";
const chatSchema= new Schema({
    chatId:{
        type:String,
        required:true
    },
    groupId:{
        type:Schema.Types.ObjectId,
        ref:"group",
        required:true
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    message:{
        type:String,
        required:true,
        trim:true,
    }
},{timestamps:true})
export const chats= mongoose.model("chats",chatSchema)