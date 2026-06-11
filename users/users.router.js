
import {Router} from "express"
import { signupUser,loginUser,getUser } from "./users.controller.js";
import { authenticateToken } from "../utilities.js";

export const userRouter = Router();

userRouter.post("/signup",signupUser);
userRouter.post("/login",loginUser);
userRouter.get("/getuser",authenticateToken,getUser);

