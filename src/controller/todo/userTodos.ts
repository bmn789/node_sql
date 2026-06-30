import pool from "@/config/db";
import Todo from "@/models/Todo";
import type { RequestHandler } from "express";

const userTodos: RequestHandler = async (req, res) => {


    const user_id = req.user_id
    const data = await pool.query(`
        SELECT *, json_build_object(
        'id', users.id,
        'name', users.name,
        'email', users.email
    ) AS owner FROM todos
        LEFT JOIN users
        ON todos.owner_id = users.id
        `)

    return res.json(data.rows)
}


export default userTodos