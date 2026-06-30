import User from "@/models/User";
import type * as UserT from "@/types";
import type { RequestHandler } from "express";

type Params = {
    userId: UserT.PickId
}

const updateUsers: RequestHandler<Params, UserT.UserT, UserT.Partial_OmitId> = async (req, res) => {

    console.log(req.params.userId)
    const data = await User.update(req.params.userId, req.body)
    return res.json(data)

}

export default updateUsers