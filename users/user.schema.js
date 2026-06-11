import { Schema,model } from "mongoose";

const userSchema = new Schema({
    fullName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    createdOn:{
        type:Date,
        default:Date.now(),
    },
});

export const User = model("User",userSchema);