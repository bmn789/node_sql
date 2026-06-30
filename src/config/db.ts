import { Client, Pool } from "pg";
import dotenv from "dotenv"

dotenv.config({ path: ".env.prod" })

const DB_URL = process.env.DB_URL as string

console.log("DB_URL", DB_URL)

const pool = new Pool({
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

export default pool

async function innitialize() {

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY DEFAULT unique_rowid(),
    name STRING NOT NULL,
    email STRING UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS todos (
    id INT PRIMARY KEY DEFAULT unique_rowid(),
    title STRING NOT NULL,
    description STRING NOT NULL,
    owner_id INT,
    CONSTRAINT fk_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
);
        `)

}

// innitialize()