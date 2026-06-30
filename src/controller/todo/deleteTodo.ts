import Todo from "@/models/Todo";
import type { RequestHandler } from "express";

type Params = {
    todoId: string
}

const deleteTodo: RequestHandler<Params> = async (req, res) => {

    const todoId = req.params.todoId as any
    const data = await Todo.delete(todoId)
    return res.json(data)
}


export default deleteTodo