import { createModel } from "@/config/Model";
import z from "zod";


const todo_z = z.object({
    id: z.number(),
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255)
})

const Todo = createModel({ table: "todos", schema: todo_z })

export default Todo
