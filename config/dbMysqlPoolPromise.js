import {dbMysqlPool} from "./dbMysqlPool.js";
import mysqlPromise from "mysql2-promise";

const PORT_MYSQL = process.env.DATABASE_PORT;

export const dbMysqlPoolPromise = async () => {
    
  try {    
    await mysqlPromise(err => {
        console.log("Mysql DB Connection Failed!!");
        console.log(err);
    });
    console.log(`Mysql DB connected on port: ${PORT_MYSQL}`);
  } catch (error) {
    
    console.error(error);
  }
};