//TODO creating user controller

import { userSchema } from "../sqlEntities/userEntity";

const getAllUsers = async (req, res) => {
  const users = await userSchema.findAll({
    order: [["username", "ASC"]],
    attributes: ["username", "email"],
    // use for limiting query result/pagination
/*     offset: 10,
    limit: 10 */
  });
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

// TODO COMPLETE all request later

/* const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
}; */
