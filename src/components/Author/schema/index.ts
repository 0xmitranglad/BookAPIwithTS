import Author from './AuthorSchema';
import AuthorBook from './AuthorBookSchema';
import { Book } from '../../Book/schema';

    Author.belongsToMany(Book, {
      through: AuthorBook,
      foreignKey: "author_id",
      otherKey: "book_id",
    });
    
    Book.belongsToMany(Author, {
      through: AuthorBook,
      foreignKey: "book_id",
      otherKey: "author_id",
    });

export {Author, AuthorBook};