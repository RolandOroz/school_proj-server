import { userSchema } from "../sqlEntities/userEntity.js";

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles !== 110) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);
    const result = req.roles
    if (!result) return res.sendStatus(401);
    next();
  };
};