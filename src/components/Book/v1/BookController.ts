import {Request, Response} from 'express';
import _ from 'underscore';
import { v4 as uuidv4 } from 'uuid';
import customRequest from '../../../environment';
import { BookModel } from '../model';
import sequelize from '../../../utils/mysql';
import { Author } from '../../Author/schema';
import AuthorBookModel from '../../Author/model/AuthorBookModel';
import Sequelize, { Transaction } from 'sequelize';

const Op = Sequelize.Op;


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
            let authorId = req.custom?.user?.id;

            var newBook: any = await BookModel.addOne(body, transactionVar);
            await newBook.addAuthors(authorId,{transaction : transactionVar} );
            
            await transactionVar.commit();
            console.log('New Book Added');
            res.status(200).json(newBook);
            
        } catch (error) {
            console.log(error);
            await transactionVar.rollback();
            res.status(500).send();            
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

            if(Books) {
                res.status(200).json(Books);
            } else {
                console.log('No Book Added');
                res.status(404).send();
            }
            
            
        } catch (error) {
            console.log(error);
            res.status(500).send();
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

            if(Book) {
                res.status(200).json(Book);
            } else {
                console.log('Book not found');
                res.status(404).send();
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }

    }

    async UpdateBook(req: customRequest, res: Response) {

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
            var authorId = req.custom?.user?.id;
            let condition = {
                uuid: uuid,
                deletedAt: null
            };

            const Found: any = await BookModel.getSingleWithCondition(condition);
            if(Found) {
                let check = {
                    [Op.and]: {
                        author_id: authorId,
                        book_id: Found.id 
                    }
                };

                //check weather this book is login author's or Not
                const checkAuthorBook = await AuthorBookModel.getSingleWithCondition(check);
                if(checkAuthorBook) {
                    let UpdateBook = await BookModel.updateOne( uuid, body);
                    let newBook = await BookModel.getSingleWithCondition(condition);

                    if(UpdateBook && newBook) {
                        console.log('Update successful');
                        res.status(200).json(newBook);
                    } else {
                        console.log('Update failed');
                        res.status(500).send();
                    }
                }
                else {
                    console.log('Book does not belongs to the author logged in');
                    res.status(401).send();
                }
            } else {
                console.log('book not found for passed uuid');
                res.status(400).send();
            }        
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }

    async DeleteBook(req: customRequest, res: Response) {

        let authorId = req.custom?.user?.id;
        try {
            let uuid =req.params.uuid;
            let condition = {
                uuid: uuid,
                deletedAt: null
            }

            let matchedBook:any = await BookModel.getSingleWithCondition(condition);
            console.log('Book Matched');

            if(matchedBook) {
                let check = {
                    [Op.and]: {
                        author_id: authorId,
                        book_id: matchedBook.id 
                    }
                };

                const checkAuthorBook = await AuthorBookModel.getSingleWithCondition(check);
                if(checkAuthorBook) { 
                    const delRow = await BookModel.delete(uuid);

                    if(delRow == 0) {
                            console.log('Delete unsuccessful');
                            res.send(500).send();
                    } else {
                        console.log('Deleted Successfully');
                        res.status(200).send();
                    }
                } else {
                    console.log('Book does not belongs to the author logged in');
                    res.status(401).send();
                }

            } else {
                console.log('Book Not Found');
                res.status(400).send();
            }
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }
}

export default new BookController();