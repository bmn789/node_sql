import express from 'express'
import userRouter from './routes/user.route.js'

import db from "./config/db"
import Utils from './utils/index.js'
import apiRoute from './routes/api.route.js'



const app = express()
app.use(express.json())


app.get("/api/health", (req, res) => {
    throw Error("not")
})

app.use("/api", apiRoute)


app.use((err: Error, req: any, res: any, next: any) => {
    console.log(err)
   const e = Utils.catch(err)
    res.status(e.status).send(e);
})


app.listen(8000, () => console.log("Server running http://localhost:8000"))