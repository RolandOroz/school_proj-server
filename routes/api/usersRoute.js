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
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getAllUsers);

router
  .route("/:_id")
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), getUser)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

export { router };
