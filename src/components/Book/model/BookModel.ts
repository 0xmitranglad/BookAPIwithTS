import { Transaction } from "sequelize";
import Book from "../schema/BookSchema";

class BookModel {
  

    async addOne(bookObj: any, transaction?: Transaction | undefined) {
        try {
            const insertedObj = await Book.create(bookObj, {
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
            const foundObj = await Book.findOne({
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
            const foundObj = await Book.findAll({
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
            const updatedRow = await Book.update(bookObj, {
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

export default new BookModel();