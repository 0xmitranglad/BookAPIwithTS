import { DataTypes, Model } from 'sequelize';
import Author from './AuthorSchema';
import Book from '../../Book/schema/BookSchema';
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
  
    // Author.belongsToMany(Book, {
    //   through: AuthorBook,
    //   foreignKey: "author_id",
    //   otherKey: "book_id",
    // });
    // Book.belongsToMany(Author, {
    //   through: AuthorBook,
    //   foreignKey: "book_id",
    //   otherKey: "author_id",
    // });

    // Author.belongsToMany(Book, {
    //   through: AuthorBook,
    //   foreignKey: "authorId",
    //   otherKey: "bookId",
    // });
    // Book.belongsToMany(Author, {
    //   through: AuthorBook,
    //   foreignKey: "bookId",
    //   otherKey: "authorId",
    // });


export default AuthorBook;