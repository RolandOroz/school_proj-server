import express from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "404.html"));
});

export  {router};
