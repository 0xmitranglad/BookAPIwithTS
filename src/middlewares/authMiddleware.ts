import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AuthorModel } from '../components/Author/model';
import customRequest from './../environment';

async function checkAuthentication(req: customRequest, res: Response, next: NextFunction) : Promise<any> {
    try {

        let userToken = String(req.get('Auth'));
        console.log('user Token -----')
        console.log(userToken);
        
        if(typeof userToken !== 'undefined') {

            const token: any = jwt.verify(userToken, 'TOKEN_SECRET');
            if(token) {
                const findAuthor :any = await AuthorModel.getSingleWithCondition({uuid : token.uuid});
                req.custom!.user = { id: 0 };
                if(findAuthor) {
                    req.custom!.user.id = findAuthor.id;
                    next();
                }else {
                    console.log('Auth code Invalid, thrown from middleware');
                    res.status(401).send();
                }
            } else {
                console.log('Auth token not verified');
                res.status(401).send();
            }

        } else {
            console.log('Auth Token Missing');
            res.status(400).send();
        }

    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}

export default checkAuthentication;