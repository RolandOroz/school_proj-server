import express from "express";
const router = express.Router();
import { ROLES_LIST } from "../../config/rolesList.js";
import { verifyRoles } from "../../middleware/verifyRoles.js";
import {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} from "../../controllers/usersController.js";

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers);

  router.route("/editor", verifyRoles(ROLES_LIST.Editor));
/* 
  router
  .route("/users")
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), getAllUsers); */

router
  .route("/:_id")
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getUser)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

export { router };
