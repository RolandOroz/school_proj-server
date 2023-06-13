import { userR, adminR, editorR } from "../controllers/rolesListController";


export const ROLES_LIST = {
  "Admin": adminR,
  "Editor": editorR,
  "User": userR,
};
