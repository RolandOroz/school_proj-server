import { userSchema } from "../sqlEntities/userEntity.js";
import bcrypt from "bcrypt";

export const handleNewUser = async (req, res) => {
  const { username, password, email, roles } = req.body;
  const user = req.body.username;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });

  // Check for duplicate username in the DB
  const duplicateUsername = await userSchema.findOne({
    where: { username: username },
  });

  if (duplicateUsername) return res.sendStatus(409); //Conflict
  try {
    // Encrypt the password
    const hashPwd = await bcrypt.hash(password, 10);
    // Create and store new user
    const result = await userSchema.create({
      username: username,
      email: email,
      password: hashPwd,
      roles: roles,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${username} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
