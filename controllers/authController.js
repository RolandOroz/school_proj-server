import { userSchema } from "../sqlEntities/userEntity.js";
import { roleSchema } from "../sqlEntities/rolesEntity.js";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const { username, password } = req.body;
    if(!username || !password)
    return res.status(400).json({ "message": "Username and password required." });

    const foundUser = await userSchema.findOne({
        where: { username: username }
    });
    if(!foundUser) return res.sendStatus(401); // unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if(match) {
      const roles = await userSchema.findOne({
        include: [
          {
            model: roleSchema,
            where: { _id: req.body.roleId },
          },
        ],
        where: { username: req.body.username },
      });
      if (!roles) return res.sendStatus(401); // unauthorized
      const rolesObj = Object.values(roles).filter(Boolean);
      // TODO  logger here
      console.log(rolesObj);

      const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles,
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      // set to 'n' min (45s only for DEV MODE)
      { expiresIn: "20s" }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      // set to 'n' Day (2 min only for DEV MODE)
      { expiresIn: "30" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    //TODO logger here
    console.log(result);
    console.log(roles);
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}); // secure:true,
    res.json({ roles, accessToken });
    } else {
        res.sendStatus(401);
    }
    
}
