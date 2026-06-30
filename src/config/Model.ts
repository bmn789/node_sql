import pool from "@/config/db"
import { z } from "zod"

type CreateModelOptions<T> = {
    table: string
    schema: z.ZodType<T>
}

export function createModel<T extends Record<string, any>>({
    table,
    schema,
}: CreateModelOptions<T>) {

    return class {

        constructor(data: T) {
            Object.assign(this, schema.parse(data))
        }

        async save(): Promise<T> {
            const record = { ...this }

            delete (record as any).id

            const keys = Object.keys(record)
            const values = Object.values(record)

            const columns = keys.join(", ")
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ")

            const { rows } = await pool.query(
                `
                INSERT INTO ${table} (${columns})
                VALUES (${placeholders})
                RETURNING *
                `,
                values
            )

            Object.assign(this, rows[0])

            return rows[0]
        }

        static async find(): Promise<{ data: T[]; count: number }> {
            const { rows } = await pool.query(`SELECT * FROM ${table}`)
            const { rows: total } = await pool.query(`SELECT COUNT(*) FROM ${table}`)

            return {
                data: rows,
                count: Number(total[0].count),
            }
        }

        static async findById(id: number): Promise<T> {
            const { rows } = await pool.query(
                `SELECT * FROM ${table} WHERE id = $1`,
                [id]
            )

            if (!rows.length) {
                throw new Error("Record not found")
            }

            return rows[0]
        }

        static async update(id: number, record: Partial<T>): Promise<T> {
            const keys = Object.keys(record)
            const values = Object.values(record)

            const set = keys
                .map((key, i) => `${key} = $${i + 2}`)
                .join(", ")

            const { rows } = await pool.query(
                `
                UPDATE ${table}
                SET ${set}
                WHERE id = $1
                RETURNING *
                `,
                [id, ...values]
            )

            if (!rows.length) {
                throw new Error("Record not found")
            }

            return rows[0]
        }

        static async delete(id: number): Promise<T> {
            const { rows } = await pool.query(
                `
                DELETE FROM ${table}
                WHERE id = $1
                RETURNING *
                `,
                [id]
            )

            if (!rows.length) {
                throw new Error("Record not found")
            }

            return rows[0]
        }
    }
}