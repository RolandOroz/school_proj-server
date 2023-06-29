import dotenv from "dotenv";
dotenv.config();
import { userSchema } from "../sqlEntities/userEntity.js";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    //Comment when in DEV MODE
    secure: true,
    // set to 1 Day (2 min only for DEV MODE)
    //maxAge: 24 * 60 * 60 * 1000,
    maxAge: 60 * 1000,
  });

  const findUser = await userSchema.findOne({
    where: { refreshToken: refreshToken },
  });
  // const foundUser = await findUser.dataValues.refreshToken;
  // Detected refresh token reuse!
  if (!findUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden
        // refresh token rotation
        const preventReuseAttempt = await userSchema.findOne({
          where: { username: decoded.username },
        });

        preventReuseAttempt.dataValues.refreshToken = [];
        const result = await preventReuseAttempt.save();
      }
    );
    return res.sendStatus(403); // Forbidden
  }

  // evaluate JWTs
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        console.log(err);
        const result = await userSchema.save({
          refreshToken: newRefreshToken,
        });
      }
      const usernameF = findUser.dataValues.username;
      if (err || usernameF !== decoded.username) return res.sendStatus(405);

      // Refresh token was still valid
      const roles = findUser.dataValues.roleId;
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roleId: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        // make it 5min min (45s only in DEV MODE)
        //{ expiresIn: "300s" }
        { expiresIn: "50s" }
      );

      const newRefreshToken = jwt.sign(
        { username: findUser.dataValues.username },
        process.env.REFRESH_TOKEN_SECRET,
        // set to 'n' Day (2 min only for DEV MODE)
        // { expiresIn: "1d" }
        { expiresIn: "50s" }
      );

      // MongoDB
      // Saving refreshToken with current user
      const saveUser = await userSchema.findOne({
        where: { username: findUser.dataValues.username },
      });
      const result = await findUser.update({ refreshToken: refreshToken });

      console.log(result);

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        //TODO PRODUCTION uncomment secure: true when not in DEV MODE
        //TODO PRODUCTION uncomment secure: true,
        //secure: true,
        // set to 'n' Day (2 min only for DEV MODE)
        //maxAge: 24 * 60 * 60 * 1000,
        maxAge: 30 * 1000,
      });

      res.json({ roles, accessToken });
    }
  );
};
