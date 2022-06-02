import {Request, Response} from 'express';
import _ from 'underscore';
import { v4 as uuidv4 } from 'uuid';
import { AuthorModel } from '../model';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthorValidation from './AuthorValidation';



class AuthorController {

    async AddAuthor(req: Request, res: Response){
        try {

            let body: any = _.pick(
                req.body,
                'firstName',
                'lastName',
                'username',
                'email',
                'password',
                'city',
                'country'
            );

            body.uuid = uuidv4();

            const Author = await AuthorModel.addOne(body);
            res.json(Author);

        } catch (error) {
            console.log(error);
            res.status(400);
        }
    }

    async Login(req: Request, res: Response) {

        try {
            let body: { email: string, password: string} = _.pick(req.body, 'email', 'password');

            if(typeof body.email !== 'string' || typeof body.password !== 'string') {
                res.status(400);
            }

            const author = await AuthorValidation.authenticate(body);

            let token = jwt.sign({ uuid: author.uuid }, 'TOKEN_SECRET', { expiresIn: 60 * 60 });
            var obj = {accesstoken: token}
            const upt = await AuthorModel.updateOne(author.uuid, obj);
            if(upt) {
                console.log(`login success`);
                res.json(token);
            }  

            console.log(obj);
            
        } catch (error) {
            console.log(error);
        }
    }

}

export default new AuthorController();