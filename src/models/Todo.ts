import { createModel } from "@/config/Model";
import type { TodoT } from "@/types";
import z from "zod";


const todo_z = z.object({
    id: z.string().optional(),
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    owner_id: z.string()
})

const Todo = createModel<TodoT>({ table: "todos", schema: todo_z as any })

export default Todo
