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
    //TODO PRODUCTION uncomment: secure: true
    //secure: true,
    // set to 1 Day (2 min only for DEV MODE)
    //maxAge: 24 * 60 * 60 * 1000,
    maxAge: 30 * 1000,
  });

  const foundUser = await userSchema.findOne({ refreshToken });

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden
        // refresh token rotation
        const preventReuseAttempt = await userSchema.findOne({
          username: decoded.username,
        });
        preventReuseAttempt.refreshToken = [];
        const result = await preventReuseAttempt.save();
        // TODO PRODUCTION delete log
        console.log(result);
      }
    );
    return res.sendStatus(403); // Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (refTok) => refTok !== refreshToken
  );

  // evaluate JWTs
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save();
      }
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);

      // Refresh token was still valid
      const roles = Object.values(foundUser.roles);
/*       const roles = await userSchema.findOne({
        include: [
          {
            model: roleSchema,
            where: { _id: req.body.roleId },
          },
        ],
        where: { username: req.body.username },
      }); */
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        // make it 5min min (45s only in DEV MODE)
        //{ expiresIn: "300s" }
        { expiresIn: "30s" }
      );

      const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        // set to 'n' Day (2 min only for DEV MODE)
       // { expiresIn: "1d" }
        { expiresIn: "30s" }
      );

      // MongoDB
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

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
