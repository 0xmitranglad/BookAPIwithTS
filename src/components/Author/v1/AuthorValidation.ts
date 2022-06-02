import { AuthorModel } from '../model';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';



class AuthorValidation {
    
    //class Method Authenticate
    async authenticate(body: { email: string, password: string}) {
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
        }
    }
}
export default new AuthorValidation();