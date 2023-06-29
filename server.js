import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { expressCspHeader, INLINE, NONE, SELF } from "express-csp-header";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
import { dbMysqlPool } from "./config/dbMysql2/dbMysqlPool.js";
import { userSchema } from "./sqlEntities/userEntity.js";
import { rolesListSchema } from "./sqlEntities/rolesListEntity.js";
//import { roleSchema } from "./sqlEntities/rolesEntity.js";
import { router as usersRoute } from "./routes/api/usersRoute.js";
import { router as authRoute } from "./routes/authRoute.js";
import { router as registerRoute } from "./routes/registerRoute.js";
import { router as refreshRoute } from "./routes/refreshRoute.js";
import { router as logoutRoute } from "./routes/logoutRoute.js";
import { router as page404Route } from "./routes/page404Route.js";

import root from "./routes/root.js";

import { verifyJWT } from "./middleware/verifyJWT.js";
//import { logger } from "./middleware/logEvents.js";
import { fileURLToPath } from "node:url";
import {
  getAllUsers,
  getUser,
  deleteUser,
} from "./controllers/usersController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT_MYSQL = process.env.DATABASE_PORT;

//*******************TEST ZONE***************//
// TODO move out from server.js
const createTableUser = async (data) => {
  try {
    await userSchema.sync();
    console.log("Table Created!");
  } catch (error) {
    console.error(error);
  }
};

const createTableRolesList = async (data) => {
  try {
    await rolesListSchema.sync();
    console.log("Table Created!");
  } catch (error) {
    console.error(error);
  }
};

//FK constraints
rolesListSchema.hasMany(userSchema, {
  foreignKey: "roles",
});
userSchema.belongsTo(rolesListSchema, {
  foreignKey: "roles",
});
createTableUser();
createTableRolesList();

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
//middleware for cookies
app.use(cookieParser());


//serve static files (css, img, text, etc.)
app.use("/", express.static(path.join(__dirname, "/public")));

//Routes
app.use("/", root);
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);

// from here JWT token is sending tokens
app.use(verifyJWT);
app.use("/users", usersRoute);

//TODO Finishs Custom 404 Page
//app.use("*", page404Route);



connectionDB.execute("open", () => {
  // Port listener
  app.listen(PORT_SERVER, () =>
    console.log(`Server connected on port: ${PORT_SERVER}`)
  );
});

// TODOCustom middleware logger
//app.use(logger)
