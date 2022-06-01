import { Transaction } from "sequelize";
import Author from "../schema/AuthorSchema";

class AuthorModel {
  

    async addOne(bookObj: any, transaction?: Transaction | undefined) {
        try {
            const insertedObj = await Author.create(bookObj, {
                transaction: transaction ? transaction : undefined
            });
            return insertedObj;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getSingleWithCondition(condition: any, attributes?: string[], other?: object) {
        try {
            const foundObj = await Author.findOne({
                where: condition,
                attributes: attributes ? attributes : undefined,
                ...other
            });
            return foundObj;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getMany(condition: any, attributes?: string[], other?: object) {
        try {
            const foundObj = await Author.findAll({
                where: condition,
                attributes: attributes ? attributes : undefined,
                ...other
            });
            return foundObj;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateOne( uuid: number | string, bookObj: any, transaction?: Transaction | undefined) {
        try {
            
            const updatedRow = await Author.update(bookObj, {
                where: { uuid },
                transaction: transaction ? transaction : undefined
            });
            return updatedRow;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default new AuthorModel();