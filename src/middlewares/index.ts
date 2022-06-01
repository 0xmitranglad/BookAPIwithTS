import express, { NextFunction , Request , Response} from "express";
import {Application} from "express";
import fileUpload from "express-fileupload";
import uuid from "../middlewares/uuid";


export default (app: Application) => {

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use
    (fileUpload
      (
        {
          createParentPath: true,
          abortOnLimit: true
        }
      )
    )
    uuid(app);

    // app.use(i18n.init);
    // uuid(app);
  
    app.use(underMaintenanceCheck);
  
  };


  let underMaintenanceCheck = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.APP_UNDER_MAINTAINANCE === 'true') {
      res.status(503).json({
        status: 503,
        message: 'SERVICE_UNAVAILABLE'
      });
      return;
    } else {
      next();
    }
  };