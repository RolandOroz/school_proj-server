// TODO Make an winston logger

import winston, {transports} from "winston";

export const logger = winston.createLogger({
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


