

import { userSchema } from "../sqlEntities/userEntity.js";
//DONE
export const getAllUsers = async (req, res) => {
  const users = await userSchema.findAll();
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
};

// TODO COMPLETE all request later

const deleteUser = async (req, res) => {
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
//DONE
export const getUser = async (req, res) => {
  const id = req.params._id;
  if (!id)
  
    return res.status(400).json({ message: "User ID required" });
  const user = await userSchema.findByPk(id);
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${id} not found` });
  }
  res.json(user);
};
