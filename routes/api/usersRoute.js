import express from "express";
import {getAllUsers} from "../../controllers/usersController.js";
import {ROLES_LIST} from "../../config/rolesList.js";

export const usersR = app.get("/api", (req, res) => {
  /* req.status(200).send(JSON.stringify(getAllUsers())); */
  res.status(200).send("<h1>TEST SERVER NUMBER 2</h1>");
});
 




