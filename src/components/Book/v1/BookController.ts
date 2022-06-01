import {Request, Response} from 'express';
import _ from 'underscore';
import { v4 as uuidv4 } from 'uuid';
import customRequest from '../../../environment';
import BookModel from '../model/BookModel';
import sequelize from '../../../utils/mysql';
import { Author, AuthorBook } from '../../Author/schema'



class BookController {

    async AddBook(req: customRequest, res: Response) {

        const transactionVar = await sequelize.transaction();

        try {

            let body: any = _.pick(
                req.body,
                'name',
                'author',
                'language',
                'publisher',
                'edition',
                'publishYear'
            );
            body.uuid = uuidv4();
            var authorId = req.custom?.user?.id;
            console.log('Author Id ----- from access token');
            console.log(authorId);
            console.log(body);


            var newBook: any = await BookModel.addOne(body, transactionVar);
            await newBook.addAuthors(authorId,{transaction : transactionVar} );

            console.log(newBook);
            
            await transactionVar.commit();
            res.json(newBook);
            
        } catch (error) {
            console.log(error);
            await transactionVar.rollback();
        }

    }

    async ListBook(req: Request, res: Response) {

        try {
            let condition = {
                deletedAt: null
            }

            let BookAttributes = ['id','name', 'language', 'publisher', 'edition', 'publishYear'];
            let other = {
                include: [
                    {
                        model: Author,
                        attributes: ['firstName', 'lastName', 'email'],
                        through: { attributes: [] }
                    }
                ]};

            const Books = await BookModel.getMany(condition, BookAttributes, other);
            res.json(Books);
            
        } catch (error) {
            console.log(error);
        }

    }

    async ListOneBook(req: Request, res: Response) {

        try {

            let uuid =req.params.uuid;
            let condition = {
                uuid: uuid,
                deletedAt: null
            }
            let BookAttributes = ['id','name', 'language', 'publisher', 'edition', 'publishYear'];
            let other = {
                include: [
                    {
                        model: Author,
                        attributes: ['firstName', 'lastName', 'email'],
                        through: { attributes: [] }
                    }
                ]};

            const Book = await BookModel.getSingleWithCondition(condition, BookAttributes, other);

            res.json(Book);
            
        } catch (error) {
            console.log(error);
        }

    }

    async UpdateBook(req: Request, res: Response) {

        try {

            let body = _.pick(
                req.body,
                'name',
                'author',
                'language',
                'publisher',
                'edition',
                'publishYear'
            );  

            let uuid =req.params.uuid;


            let condition = {
                uuid: uuid,
                deletedAt: null
            }

            const Found: any = await BookModel.getSingleWithCondition(condition);
            
            if(Found) {

                let UpdateBook = await BookModel.updateOne( uuid, body);

                let newBook = await BookModel.getSingleWithCondition(condition);
                console.log(UpdateBook);

                res.json(newBook);
                
            }
            

        } catch (error) {
            console.log(error);
        }

    }



}

export default new BookController();
