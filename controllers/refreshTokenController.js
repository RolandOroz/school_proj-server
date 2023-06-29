import dotenv from "dotenv";
dotenv.config();
import { userSchema } from "../sqlEntities/userEntity.js";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;

  const foundUser = await userSchema.findOne({
    where: { refreshToken: refreshToken },
  });
  if (!foundUser) return res.sendStatus(403); // Forbidden

  // Evaluate JWT
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
        if (err || foundUser.dataValues.username !== decoded.username);

              const accessToken = jwt.sign(
                {
                  UserInfo: {
                    username: decoded.username
                  },
                },
                process.env.ACCESS_TOKEN_SECRET,
                // make it 5min min (45s only in DEV MODE)
                //{ expiresIn: "300s" }
                { expiresIn: "10s" }
              );
              res.json({ accessToken });
              //console.log(rolesObj);
    })
}