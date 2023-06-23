

import { userSchema } from "../sqlEntities/userEntity.js";
//DONE
export const getAllUsers = async (req, res) => {
  const users = await userSchema.findAll();
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
};

// TODO TESTDELETE BY ID!!!!!!!
export const deleteUser = async (req, res) => {
  const id = req.body._id; 
  if (!id)
    return res.status(400).json({ message: "User ID required" });
  const user = await userSchema.findByPk(id);
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${id} not found` });
  }
  const result = await user.destroy({
    where: { _id: id }
  });
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
