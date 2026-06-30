import User from "@/models/User";
const updateUsers = async (req, res) => {
    const data = await User.update(req.params.user_id, req.body);
    return res.json(data);
};
export default updateUsers;
//# sourceMappingURL=updateUser.js.map