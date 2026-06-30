import { Router } from "express";
import addUser from "@/controller/user/addUser";
import allUsers from "@/controller/user/allUser";
import updateUsers from "@/controller/user/updateUser";
import deleteUser from "@/controller/user/deleteUser";
import userTodos from "@/controller/todo/userTodos";

const userRoute = Router()

userRoute.get("/user/all",allUsers)
userRoute.get("/user/todo/all",userTodos)

userRoute.post("/user", addUser)

userRoute.put("/user/:userId", updateUsers)
userRoute.delete("/user/:userId", deleteUser)



export default userRoute