import { Sequelize } from "sequelize";

var sequelize = new Sequelize('Library', 'mitrang', 'Smart@123', {
    dialect: 'mysql',
    host: 'localhost'
});

export default sequelize;