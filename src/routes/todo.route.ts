import addTodo from "@/controller/todo/addTodo";
import allTodo from "@/controller/todo/allTodo";
import deleteTodo from "@/controller/todo/deleteTodo";
import getTodo from "@/controller/todo/getTodo";
import updateTodo from "@/controller/todo/updateTodo";
import Utils from "@/utils";
import { Router } from "express";

const todoRoute = Router()

todoRoute.use(async (req, res, next) => {
    const user_id = req.headers["x-user-id"] as string
    if (!user_id) {
        Utils.throw("Not Authorized", 401)
    }
    req.user_id = user_id
    return next()
})

todoRoute.get("/todo/all", allTodo)
todoRoute.post("/todo", addTodo)
todoRoute.get("/todo/:todoId", getTodo)
todoRoute.put("/todo/:todoId", updateTodo)
todoRoute.delete("/todo/:todoId", deleteTodo)



export default todoRoute