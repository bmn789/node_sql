import { Router } from "express";
import addUser from "@/controller/addUser";
import allUsers from "@/controller/allUser";
import updateUsers from "@/controller/updateUser";
const userRouter = Router();
userRouter.get("/user/all", allUsers);
userRouter.post("/user", addUser);
userRouter.put("/user/:userId", updateUsers);
export default userRouter;
//# sourceMappingURL=users.js.map