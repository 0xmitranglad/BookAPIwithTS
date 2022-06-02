import { Transaction } from "sequelize";
// import { Op } from "sequelize";
import AuthorBook from "../schema/AuthorBookSchema";


class AuthorBookModel {
  

    async addOne(bookObj: any, transaction?: Transaction | undefined) {
        try {
            const insertedObj = await AuthorBook.create(bookObj, {
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
            const foundObj = await AuthorBook.findOne({
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
            const foundObj = await AuthorBook.findAll({
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
            const updatedRow = await AuthorBook.update(bookObj, {
                where: { uuid },
                transaction: transaction ? transaction : undefined
            });
            return updatedRow;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    // const Op = Sequelize.Op;
    // async getAuthorBook(book_id: any, author_id: any) {
    //     const CheckAuthor = await AuthorBook.findOne({
    //         where: {
    //             [Op.and]: {
    //                 author_id: author_id,
    //                 book_id: book_id
    //             }
    //         }
    //     });

    //  return CheckAuthor;
    // }
}

export default new AuthorBookModel();



// export default getAuthorBook