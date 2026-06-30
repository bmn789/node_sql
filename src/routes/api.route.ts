import { Router } from "express";
import todoRoute from "./todo.route";
import userRoute from "./user.route";

const apiRoute = Router()

apiRoute.use(userRoute, todoRoute)

export default apiRoute