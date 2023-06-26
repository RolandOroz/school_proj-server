import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { expressCspHeader, INLINE, NONE, SELF } from "express-csp-header";
import path from "path";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
import { dbMysqlPool } from "./config/dbMysql2/dbMysqlPool.js";
import { userSchema } from "./sqlEntities/userEntity.js";
import { roleSchema } from "./sqlEntities/rolesEntity.js";
import { router as usersRoute } from "./routes/api/usersRoute.js";
import { router as registerRoute } from "./routes/registerRoute.js";
import { router as refreshRoute } from "./routes/refreshRoute.js";
import root from "./routes/root.js";
import {handleLogin} from "./controllers/authController.js";
import { verifyJWT } from "./middleware/verifyJWT.js"
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

const createTableUser = async (data) => {
  try {
    await userSchema.sync();
    console.log("Table Created!");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const createTableRole =  async (data) => {
  try {
    await roleSchema.sync();
    console.log("Table Created!");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};


roleSchema.hasMany(userSchema, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
userSchema.belongsTo(roleSchema, {
  onDelete: "CASCADE",
});
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


// ----TEST----TEST----TEST--END


//serve static files (css, img, text, etc.)
app.use("/", express.static(path.join(__dirname, "/public")));

//Routes
app.use("/", root);

app.use("/register", registerRoute);
app.use("/auth", handleLogin);
app.use("/refresh", refreshRoute);

// from here JWT token is sending tokens
app.use(verifyJWT);
app.use("/users", usersRoute);

// Custom 404 Page
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found!" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});



connectionDB.execute("open", () => {
  // Port listener
  app.listen(PORT_SERVER, () =>
    console.log(`Server connected on port: ${PORT_SERVER}`)
  );
});

// Custom middleware logger
//app.use(logger)



dbMysqlPool.query(
  "SELECT `role_name`, `role_code` FROM `roles` WHERE `_id` = ?;",
  [3],
  (err, results) => {
    console.log(JSON.stringify(Object.values(results[0])));
    if (err) return console.error(err);
  }
);


