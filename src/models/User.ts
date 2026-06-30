import pool from '@/config/db'
import type { UserT } from '@/types'
import z from 'zod'


const userSchema = z.object({
    id: z.number().optional(),
    name: z.string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),
    email: z.string().lowercase().email("Invalid email address")
})

export default class User {
    name = ""
    email = ""
    id
    constructor({ ...data }: UserT) {
        const { name, email, id } = userSchema.parse(data)
        this.name = name
        this.email = email
        this.id = id
    }

    async save(): Promise<UserT> {
        const { name, email } = this
        const data = await pool.query(`INSERT INTO users (name, email)
        VALUES($1, $2)
        RETURNING *`, [name, email])

        const row = data.rows[0]
        this.id = row.id
        return data.rows[0]
    }

    static async findById(id: Pick<UserT, "id">): Promise<UserT> {

        const data = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id])
        const row = data.rows[0]

        return row
    }

    static async find(): Promise<{data: UserT[], count : number }> {

        const { rows } = await pool.query("SELECT * FROM users")
        let total = await pool.query("SELECT count(*) FROM users")
       const count = parseInt(total.rows[0].count)

        return { data: rows, count }
    }

    static async update(id: Pick<UserT, "id">, record: Omit<UserT, "id">): Promise<UserT> {

        const values = userSchema.partial({ name: true, email: true }).omit({ id: true }).parse(record)
        const { name, email } = values
        let query = "", args: any[] = [id]
        if (name && email) {
            query = "(name = $2, email = $3)"
            args.push(name, email)
        } else if (name) {
            query = "(name = $2)"
            args.push(name)
        } else {
            query = "(email = $2)"
            args.push(email)
        }
        const data = await pool.query(`
            UPDATE users SET ${query} WHERE id = $1
            `, args)

        const row = data.rows[0]
        return row
    }

    static async delete(id: Pick<UserT, "id">): Promise<UserT> {

        const data = await pool.query(`
            DELETE FROM users WHERE id = $1
            `, [id])
        return data.rows[0]
    }


}

