import User from "@/models/User";
import type * as UserT from "@/types";
import type { RequestHandler } from "express";

type Params = {
    user_id: UserT.PickId
}

const updateUsers: RequestHandler<Params, UserT.UserT, UserT.OmitId>= async (req, res) => {

    const data = await User.update(req.params.user_id, req.body)
    return res.json(data)

}

export default updateUsers