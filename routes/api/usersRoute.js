import express from "express";
const router = express.Router();
import usersController from "../../controllers/usersController.js";
import ROLES_LIST from "../../config/rolesList.js";

export default router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  //.delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

/* router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser); */

