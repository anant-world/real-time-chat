import mongoose, { Schema } from "mongoose";
import { user } from "./user.model";
import { chats } from "./chat.model";
const cs = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    groupId:{
        type:Schema.Types.ObjectId,
        ref:"group"
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"chats"
    },
    lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "chats" 
      },
    status:{
        type:Boolean,
        required:true,

    }
},{timestamps:true})

export const conversation=mongoose.model("conversation",cs)
