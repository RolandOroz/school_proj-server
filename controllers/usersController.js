import { userSchema } from "../sqlEntities/userEntity.js";

//DONE
export const getAllUsers = async (req, res) => {
  const users = await userSchema.findAll();
  if (!users) return res.status(204).jsonp({ message: "No users found" });
  res.json(users);
};

//DONE
export const getUser = async (req, res) => {
  const id = req.params._id;
  if (!id) return res.status(400).json({ message: "User ID required" });
  const user = await userSchema.findByPk(id);
  if (!user) {
    return res.status(204).json({ message: `User ID ${id} not found` });
    _;
  }
  res.json(user);
};

// DONE
export const deleteUser = async (req, res, next) => {
  const id = req.params._id;
  if (!id) return res.status(400).json({ message: "User ID required" });
  const user = await userSchema.findByPk(id);
  const userName = req.body.username;
  if (!user) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  const result = await userSchema.destroy({
    where: {
      _id: id,
    },
  });
  console.log(`User ${userName} was deleted!`);
  res.json(result);
};
