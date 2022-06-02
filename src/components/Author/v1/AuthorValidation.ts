import { AuthorModel } from '../model';
import bcrypt from 'bcrypt';
import { Response } from "express";
// import * as jwt from 'jsonwebtoken';



class AuthorValidation {
    
    //class Method Authenticate
    async authenticate(body: { email: string, password: string}, res: Response): Promise<any> {
        try {
            
            let condition = {
                email: body.email,
                deletedAt: null
            }

            const author: any = await AuthorModel.getSingleWithCondition(condition);

            if(author) {

                const passHash: any = author.passwordHash;

                if(passHash && bcrypt.compareSync(body.password, passHash)) {
                    console.log('user authenticated successfully');
                    return author;
                } else {
                    console.log('email or pass wrong');
                    return undefined;
                }
            } else {
                console.log('author not found');
                return undefined;
            }
            
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    }
}
export default new AuthorValidation();