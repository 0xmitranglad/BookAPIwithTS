import {Request, Response} from 'express';
import _ from 'underscore';
import { v4 as uuidv4 } from 'uuid';
import { AuthorModel } from '../model';
import jwt from 'jsonwebtoken';
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
            res.status(200).json(Author);

        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    }

    async Login(req: Request, res: Response) {

        try {
            let body: { email: string, password: string} = _.pick(req.body, 'email', 'password');

            if(_.isString(body.email) && _.isString(body.password)) {

                const author = await AuthorValidation.authenticate(body, res);

                if(author) {
                    let token = jwt.sign({ uuid: author.uuid }, 'TOKEN_SECRET', { expiresIn: 60 * 60 });
                    var obj = {accesstoken: token};
                    const upt = await AuthorModel.updateOne(author.uuid, obj);
                    if(upt) {
                        console.log(`login success`);
                        res.status(200).json(token);
                    } else {
                        res.status(400).send();
                    }

                } else {
                    res.status(401).send();
                }

            } else {
                res.status(400).send();
            }

            
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    }

}

export default new AuthorController();