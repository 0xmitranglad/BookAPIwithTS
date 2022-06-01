import express from "express";
import AuthorController from "./AuthorController";

var routers = express.Router();

routers.post('/add', AuthorController.AddAuthor);
routers.post('/login', AuthorController.Login);

export default routers;