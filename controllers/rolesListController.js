import { dbMysqlPool } from "./config/dbMysqlPool.js";

export const userR = await dbMysqlPool.query(
  "SELECT `role_name` FROM `roles_code` WHERE `id` = ?;",
  [3],
  (err, results) => {
    return JSON.stringify(Object.values(results[0]));
    console.log(results);
    if (err) return console.error(err);
  }
);

export const editorR = dbMysqlPool.query(
  "SELECT `role_name` FROM `roles_code` WHERE `id` = ?;",
  [2],
  (err, results) => {
    return JSON.stringify(Object.values(results[0]));
    console.log(results);
    if (err) return console.error(err);
  }
);

export const adminR = dbMysqlPool.query(
  "SELECT `role_name` FROM `roles_code` WHERE `id` = ?;",
  [2],
  (err, results) => {
    return JSON.stringify(Object.values(results[0]));
    console.log(results);
    if (err) return console.error(err);
  }
);
