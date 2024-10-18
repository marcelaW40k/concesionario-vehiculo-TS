import mysql from 'mysql2/promise';
import config from './default';

export const getPooledConnection =  () => {
    const connection = mysql.createPool({
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE,
        port: config.PORT,
    })
    return connection;
}