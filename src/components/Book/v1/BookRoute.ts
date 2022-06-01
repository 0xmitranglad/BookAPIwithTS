import express from "express";
import BookController from "./BookController";
import checkAuthentication from '../../../middlewares/authMiddleware'


var routers = express.Router();

routers.post('/add', checkAuthentication, BookController.AddBook);
routers.get('/list', checkAuthentication, BookController.ListBook);
routers.get('/list/:uuid', checkAuthentication, BookController.ListOneBook);
routers.put('/update/:uuid', checkAuthentication, BookController.UpdateBook);
routers.delete('/delete/:uuid', checkAuthentication, BookController.DeleteBook);

export default routers;