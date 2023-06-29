import { userSchema } from "../sqlEntities/userEntity.js";

//DONE
export const getAllUsers = async (req, res) => {
  const users = await userSchema.findAll();
  if (!users) return res.status(204).json({ message: "No users found" });
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
  if (!user) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  const result = await userSchema.destroy({
    where: {
      _id: id,
    },
  });
  console.log(`User was deleted!`);
  res.json(result);
};

// DONE
export const updateUser = async (req, res) => {
  const id = req.params._id;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const user = await userSchema.findByPk(id);
  if (!user) {
    return res.status(204).json({ message: `No employee matches ID ${id}.` });
  }
  if (req.body?.username) userSchema.username = req.body.username;
  if (req.body?.email) userSchema.email = req.body.email;
  //hash password
  if (req.body?.password) userSchema.password = req.body.password;
  if (req.body?.roles) userSchema.roles = req.body.roles;
  try {
    const result = await userSchema.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
      },
      { where: { _id: req.params._id } }
    );
    console.log(`User was updated!`);
    return res.json(result);
  } catch (error) {
    console.error(error);
  }
};
