
const Sequelize = require('sequelize');

const UserModel = require('./models/User');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false,
    }
);


// Connection to word table
const Users = UserModel(sequelize, Sequelize);
const UserModel = { Users };
let isConnectedToUsers = false;

exports.connectToDatabaseWords = async () => {
    if (isConnectedToUsers) return UserModel;

    await sequelize.sync();
    await sequelize.authenticate();
    isConnectedToUsers = true;

    return UserModel;
};
