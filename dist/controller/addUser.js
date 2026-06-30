import pool from "@/config/db";
import User from "@/models/User";
const addUser = async (req, res) => {
    const u = new User(req.body);
    const data = await u.save();
    return res.json(data);
};
export default addUser;
//# sourceMappingURL=addUser.js.map