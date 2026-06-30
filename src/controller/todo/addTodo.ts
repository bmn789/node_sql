import Todo from "@/models/Todo";
import type { RequestHandler } from "express";

const addTodo: RequestHandler = async (req, res) => {

    const owner_id = req.user_id
    console.log("owner_id", owner_id)
    const data = await new Todo({ owner_id, ...req.body }).save()

    return res.json(data)

}


export default addTodo