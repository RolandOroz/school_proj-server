export const verifyRoles = (...allowedRoles) => {
  try {
    return (req, res, next) => {
      if (!req?.roles) return res.sendStatus(401);
      const rolesArray = [...allowedRoles];
      const userRole = req.roles;
      const compare = rolesArray.includes(userRole);
      console.log(rolesArray);
      console.log(userRole);
      console.log("compare", compare);
      if (compare === false) return res.sendStatus(401);
      next();
    };
  } catch (error) {
    console.error(error);
  }
};
