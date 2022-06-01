import { DataTypes, Model } from "sequelize";
import sequelize from "../../../utils/mysql";
import bcrypt from 'bcrypt';


class Author extends Model {
    
}

Author.init({
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
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    salt: {
        type: DataTypes.STRING,
    },
    passwordHash: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
            len: [7, 100]
        },
        set(value: string) {
            let salt = bcrypt.genSaltSync(10);
            let hashedPass = bcrypt.hashSync(value, salt);
            this.setDataValue('password', value);
            this.setDataValue('salt', salt);
            this.setDataValue('passwordHash', hashedPass);
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accesstoken: {
        type: DataTypes.STRING,
        defaultValue: null
    }
}, {
    sequelize,
    paranoid: true,
    modelName: 'author'
});

export default Author;