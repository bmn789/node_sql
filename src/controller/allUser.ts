import User from "@/models/User";
import type { RequestHandler } from "express";

const allUsers: RequestHandler = async (req, res) => {

    const data = await User.find()
    return res.json(data)

}

export default allUsers