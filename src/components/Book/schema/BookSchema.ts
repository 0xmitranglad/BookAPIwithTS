import { DataTypes, Model } from "sequelize";
import sequelize from "../../../utils/mysql";

class Book extends Model {

}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishYear: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: new DataTypes.DATE()
    },
    updatedAt: {
        type: new DataTypes.DATE()
    }
},{
    sequelize,
    paranoid: true,
    modelName: 'book'
});

export default Book;