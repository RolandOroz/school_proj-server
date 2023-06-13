import { userR, adminR, editorR } from "../controllers/rolesListController";
//TODO making roles list


export const ROLES_LIST = {
  "Admin": adminR,
  "Editor": editorR,
  "User": userR,
};
