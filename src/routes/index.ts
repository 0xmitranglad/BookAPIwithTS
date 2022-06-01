import { Application } from 'express';
import BookRouter from '../components/Book/v1/BookRoute'
import AuthorRouter from '../components/Author/v1/AuthorRoute'

export default (app: Application) => {
    app.use('/author', AuthorRouter);
    app.use('/book', BookRouter);
};
