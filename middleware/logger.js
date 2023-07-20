// TODO Make an winston logger
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



import winston, {transports} from "winston";

export const logger =  winston.createLogger({
  defaultMeta: { service: "user-service" },

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: "./logs/errorLog/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
      ),
    }),
    new winston.transports.File({
      filename: "./logs/combinedLog/info.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
      ),
    }),
    new transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export const loggerEv = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};
