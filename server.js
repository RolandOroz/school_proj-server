import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { expressCspHeader, INLINE, NONE, SELF } from "express-csp-header";
import path from "path";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
import { dbMysqlPool } from "./config/dbMysqlPool.js";
import { dbMysqlPoolPromise } from "./config/dbMysqlPoolPromise.js";
import  {dbSequlizeMysqlPool} from "./config/dbSequelizeMysqlPool.js";
import { userSchema } from "./sqlEntities/userEntity.js";
import { roleSchema } from "./sqlEntities/rolesEntity.js";

const PORT_MYSQL = process.env.DATABASE_PORT;

//*******************TEST ZONE***************//
/* const connectionDBSequlize = async () => {
  try {
    await dbSequlizeMysqlPool.authenticate();
    console.log(`Sequelize MysqlDB on port: ${PORT_MYSQL}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectionDBSequlize(); */

const createTableUser = async (data) => {
  try {
    await userSchema.sync({ alter: true });
    console.log("Table Created!");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
} 

const createTableRole = async (data) => {
  try {
    await roleSchema.sync({ alter: true });
    console.log("Table Created!");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}; 
createTableUser();
createTableRole();

//*******************TEST ZONE***************//
const app = express();
app.use(
  expressCspHeader({
    policies: {
      "default-src": [expressCspHeader.NONE],
      "img-src": [expressCspHeader.SELF],
    },
  })
);
const PORT_SERVER = process.env.EXPRESS_PORT_1 || process.env.EXPRESS_PORT_1;

// Connect to MysqlDB
const connectionDBPromise = dbMysqlPoolPromise;
const connectionDB = dbMysqlPool;



// Handle options credential check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
//app.use(cors({ credentials: true }));
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle URL encoded data
// in other words, form data:
// "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true }));
// built-in middleware for json
app.use(express.json());


// ----TEST----TEST----TEST
app.get("/test", (req, res) => {
      res.json("TEST__TEST");    
    
})

// ----TEST----TEST----TEST


connectionDB.execute("open", () => {
  // Port listener
  
  app.listen(PORT_SERVER, () => console.log(`Server connected on port: ${PORT_SERVER}`));
  });

  


//CREATE DATABASE IF NOT EXISTS DBname