import express from 'express';
import userRouter from './routes/users.js';
import db from "./config/db";
const app = express();
app.use(express.json());
app.get("/api/health", (req, res) => {
    throw Error("not");
});
app.use("/api", userRouter);
app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message || 'Something failed!' });
});
app.listen(8000, () => console.log("Server running http://localhost:8000"));
//# sourceMappingURL=app.js.map