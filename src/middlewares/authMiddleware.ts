import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AuthorModel } from '../components/Author/model'
import customRequest from './../environment'
async function checkAuthentication(req: customRequest, res: Response, next: NextFunction) : Promise<any> {

    try {

        //let userToken = String(req.headers['Auth']);
        let userToken = String(req.get('Auth'));

        if(userToken) {

            const token: any = jwt.verify(userToken, 'TOKEN_SECRET');
            console.log('token------------');
            console.log(token);

            if(token) {
                const findAuthor :any = await AuthorModel.getSingleWithCondition({uuid : token.uuid});
                console.log('tokens matched');
                req.custom!.user = { id: 0 };
                if(findAuthor) {
                    req.custom!.user.id = findAuthor.id;
                    next();
                }else {
                    console.log('Auth code Invalid, thrown from middleware');
                }
            } else {
                console.log('Auth token not verified');
                
            }

            // let conditions = {
            //     accesstoken: userToken
            // };
            // let attributes = ['accesstoken'];
            // const storedToken: any = await AuthorModel.getSingleWithCondition(conditions, attributes);

            // if(storedToken && storedToken.accesstoken === userToken) {
            //     console.log('tokens matched');
            //     next();
            // } else {
            //     console.log('tokens not retrived or not equal');
            // }

        } else {
            console.log('>>>Auth Token Missing');
        }

    } catch (error) {
        console.log(error);
    }


}

export default checkAuthentication;