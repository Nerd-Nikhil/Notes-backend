import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import  dotenv from "dotenv";
import { userRouter } from "./users/users.router.js";
import { notesRouter } from "./tasks/notes.router.js";

dotenv.config({quiet:true});
const app = express();

app.use(express.json());
app.use(
    cors({
        origin:"https://notes-lake-eta.vercel.app",
        credentials:true
    })
);

app.use("/",userRouter);
app.use("/",notesRouter)




const startServer = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("mongo db connected");
        app.listen(8000,()=>{
            console.log("listening at port 8000");
        })
        
    }
    catch(e){
        console.log("some error occured",e);
    }
}

startServer();
