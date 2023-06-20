import Sequelize from "sequelize";
import { dbMysqlPool } from "../dbMysql2/dbMysqlPool.js"; 


export const dbSequlizeMysqlPool = new Sequelize(
  process.env.DATABASE_DBNAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PWD,
  {
    host: process.env.DATABASE_URI,
    port: process.env.DATABASE_PORT,
    dialect: process.env.OPTONS_DIALECT,
    operationsAliases: process.env.OPERATION_ALIASES,
    pool: {
      max: dbMysqlPool.connectionLimit,
      min: dbMysqlPool.queueLimit,
      acquire: dbMysqlPool.connectTimeout,
      idle: dbMysqlPool.idleTimeout,
    },
    // Deadlock Handler
    retry: {
      match: [
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        Sequelize.TimeoutError,
        /Deadlock/i,
        "SQLITE_BUSY",
      ],
      max: 3,
    },
  }
); 

export const { DataTypes } = Sequelize;



