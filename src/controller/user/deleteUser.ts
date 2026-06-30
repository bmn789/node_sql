import type { RequestHandler } from "express";
import * as UserT from "@/types"
import User from "@/models/User";

type Params = {
    userId: UserT.PickId
}
const deleteUser : RequestHandler<Params, UserT.UserT, UserT.PickId> = async (req, res)=>{

    const data = await User.delete(req.params.userId)
    return res.json(data)
}

export default deleteUser