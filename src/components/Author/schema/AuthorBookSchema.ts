import { DataTypes, Model } from 'sequelize';
import Author from './AuthorSchema';
import { Book } from '../../Book/schema/';
import sequelize from '../../../utils/mysql';


class AuthorBook extends Model {}

    AuthorBook.init(
      {
        author_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: Author,
            key: "id",
          },
        },
        book_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: Book,
            key: "id",
          },
        },
      },
      {
        sequelize,
        paranoid: true,
        modelName: "AuthorBook",
      }
    );

export default AuthorBook;