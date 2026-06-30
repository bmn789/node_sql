import Todo from "@/models/Todo";
import type { RequestHandler } from "express";

const allTodo: RequestHandler = async (req, res) => {
    const data = await Todo.find()
    console.log(data)
    return res.json(data)
}


export default allTodo