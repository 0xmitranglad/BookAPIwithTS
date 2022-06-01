import { Application, Request, NextFunction, Response } from "express";
import customRequest from '../../environment';
import { v4 as uuidv4 } from "uuid";


export default (app: Application) => {
    app.use((req: customRequest, res: Response, next: NextFunction) => {
        if (req.custom && req.custom.req_uuid) {
            return next();
        }
        req.custom = { req_uuid: "" };
        req.custom.req_uuid = uuidv4();
        next();
    })
}

