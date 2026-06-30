import pool from '@/config/db'
import type { Partial_OmitId, PickId, UserT } from '@/types'
import Utils from '@/utils'
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
        if (!row) {
            throw Error("records not found")
        }

        return row
    }

    static async find(): Promise<{ data: UserT[], count: number }> {

        const { rows } = await pool.query("SELECT * FROM users")
        let total = await pool.query("SELECT count(*) FROM users")
        const count = parseInt(total.rows[0].count)

        return { data: rows, count }
    }

    static async update(id: PickId, record: Partial_OmitId): Promise<UserT> {

        if (!id) {
            Utils.throw("Records not found", 400)
        }

        const { email, name } = userSchema.partial({ name: true, email: true }).omit({ id: true }).parse(record)
        let query = "", args: any[] = [id]

        if (name && email) {
            query = "name = $2, email = $3"
            args.push(name, email)
        } else if (email) {
            query = 'email = $2'
            args.push(email)
        } else {
            query = 'name = $2'
            args.push(name)
        }


        const fStr = `
            UPDATE users 
            SET ${query} 
            WHERE id = $1
            RETURNING *;
            `
        const data = await pool.query(fStr, args)
        const row = data.rows[0]
        if (!row) {
            Utils.throw("Records not found", 400)
        }
        return row
    }

    static async delete(id: Pick<UserT, "id">): Promise<UserT> {

        const data = await pool.query(`
            DELETE FROM users WHERE id = $1
            RETURNING *
            `, [id])
        const row = data.rows[0]
        if (!row) {
            Utils.throw("Records not found", 400)
        }
        return row
    }


}

