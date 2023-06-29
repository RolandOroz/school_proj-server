import { userSchema } from "../sqlEntities/userEntity.js";
import { ROLES_LIST } from "../config/rolesList.js";

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const userRole = req.roles
    const compare = rolesArray.includes(userRole);
    if(compare === false )
    return res.sendStatus(401);
    next();
  };
};