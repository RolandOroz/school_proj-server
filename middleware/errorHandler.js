import { logEvents } from "./logEvents"

export const errorHandler = (err, req, res, next) => {
    logEvents(
      `[${info.timestamp}]${info.level}: ${info.message} JSON.stringify({ ...rest })`
    );
    console.log(logEvents);
    
}