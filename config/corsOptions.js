import { whiteList } from "./whiteList.js";

export const corsOptions = (req, callback) => {
  //const corsOpt = { origin: true };
        //set to no origin(!origin) only in DEV MODE!!
        let corsOpt;
        if (whiteList.indexOf(req.header("Origin")) !== -1) {
          corsOpt = { origin: true };
        } else {
          corsOpt = { origin: false };
        } 
        callback(null, corsOptions);
}