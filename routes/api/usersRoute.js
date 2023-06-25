import express from "express";
const router = express.Router();
import { ROLES_LIST } from "../../config/rolesList.js";
import {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} from "../../controllers/usersController.js";


router
  .route("/")
  .get(getAllUsers)

router.route("/:_id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);


export { router };
