import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import winston from "winston";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "dd-MM-yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs", "eventLogs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs", "eventLogs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", "eventLogs", logName),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

export const loggerEv = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}