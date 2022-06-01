import express from "express";
import middleware from "./middlewares";
import routes from "./routes";


var app = express();

middleware(app);
routes(app);



export default app;
