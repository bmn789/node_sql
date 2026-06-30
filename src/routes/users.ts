import { Router } from "express";
import addUser from "@/controller/user/addUser";
import allUsers from "@/controller/user/allUser";
import updateUsers from "@/controller/user/updateUser";
import deleteUser from "@/controller/user/deleteUser";

const userRouter = Router()

userRouter.get("/user/all",allUsers)

userRouter.post("/user", addUser)

userRouter.put("/user/:userId", updateUsers)
userRouter.delete("/user/:userId", deleteUser)



export default userRouter