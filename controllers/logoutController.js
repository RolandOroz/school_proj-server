import { userSchema } from "../sqlEntities/userEntity.js";

export const handleLogout = async (req, res) => {
  // On client delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in DB?
  const foundUser = await userSchema.findOne({
    where: { refreshToken: refreshToken },
  });
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      // set to 1 Day (2 min only for DEV MODE)
      //maxAge: 24 * 60 * 60 * 1000,
      maxAge: 120 * 1000,
    });
    return res.sendStatus(204); // No content
  }

  // Delete refreshToken in DB
  const refTok = (foundUser.refreshToken = "");
  const result = await foundUser.update({ refreeshToken: refTok });

  //TODO PRODUCTION = delete log

  console.log("Logout!");

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    //Comment when in DEV MODE
    secure: true,
    // set to 1 hour (2 min only for DEV MODE)
    maxAge: 60 * 60 * 1000,
  });
  res.sendStatus(204);
};
