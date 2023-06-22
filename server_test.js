import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { expressCspHeader, INLINE, NONE, SELF } from "express-csp-header";
import path from "path";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/credentials.js";
//import { dbMysqlPool } from "./config/dbMysql2/dbMysqlPool.js";
//import { userSchema } from "./sqlEntities/userEntity.js";
//import { roleSchema } from "./sqlEntities/rolesEntity.js";
//import root from "./routes/root.js";
//import { logger } from "./middleware/logEvents.js";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const app = express();
app.use(
  expressCspHeader({
    policies: {
      "default-src": [expressCspHeader.NONE],
      "img-src": [expressCspHeader.SELF],
    },
  })
);

const PORT_SERVER = 3700;
app.use(credentials);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//-----------------------------------------------------------------//

app.get("/servertest", (req, res) => {
    res.status(200).send("<h1>TEST SERVER NUMBER 2</h1>");
})

const api = router.get("^/$|/index(.html)?", (req, res) => {
    res.status(200).sendFile(
        path.join(__dirname, "views", "index.html"))
});


app.use(api)

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







  app.listen(PORT_SERVER, () =>
    console.log(`\n!!!!TEST TEST Server connected on port: ${PORT_SERVER}!!!!`)
  );