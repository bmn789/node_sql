import User from "@/models/User";
const allUsers = async (req, res) => {
    const data = await User.find();
    return res.json(data);
};
export default allUsers;
//# sourceMappingURL=allUser.js.map