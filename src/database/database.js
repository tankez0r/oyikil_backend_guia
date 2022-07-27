import sequelize from 'sequelize';

const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

export const conChain = new sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: 'mariadb',
        pool: {
            max: 8,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    }
);