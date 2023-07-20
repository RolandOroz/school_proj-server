import { userSchema } from "../sqlEntities/userEntity.js";
import { rolesListSchema } from "../sqlEntities/rolesListEntity.js";

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
    const match = await bcrypt.compare(password, foundUser.dataValues.password);
    if(match) {
      const user = await userSchema.findOne({
        include: [
          {
            model: rolesListSchema,
            where: { roles_code: foundUser.dataValues.roles },
          },
        ],
        where: { username: req.body.username },
      });
      const roles = user.roles;
      if (!roles) return res.sendStatus(401); // unauthorized
      // TODO  logger here

      const accessToken = jwt.sign(
        
        {
          UserInfo: {
            username: foundUser.dataValues.username,
            roles: foundUser.dataValues.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        // set to 'n' min (45s only for DEV MODE)
        { expiresIn: "300s" }
      );
    const refreshToken = jwt.sign(
      { username: foundUser.dataValues.username },
      process.env.REFRESH_TOKEN_SECRET,
      // set to 'n' Day (2 min only for DEV MODE)
      { expiresIn: "300s" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();    
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      // set to 1 hour (2 min only for DEV MODE)
      maxAge: 60 * 60 * 1000,
    }); // 
    res.json({ roles, accessToken });
    } else {
        res.sendStatus(401);
    }
    
}
