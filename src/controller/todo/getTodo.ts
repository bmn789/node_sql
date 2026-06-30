import Todo from "@/models/Todo";
import type { RequestHandler } from "express";

type Params = {
    todoId: string
}

const getTodo: RequestHandler<Params> = async (req, res) => {

    const todoId = req.params.todoId as any
    const data = await Todo.findById(todoId)
    console.log(data)
    return res.json(data)
}


export default getTodo