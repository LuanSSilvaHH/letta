import { Sequelize } from 'sequelize'
import pg from 'pg'

/* const mysql = new Sequelize({
    dialect: 'mysql',
    dialectModule: mysql2,
    host: 'localhost',
    port: '3306',
    database: 'letta_db',
    username: 'root',
    password: 'root'
}); */

const mysql = new Sequelize({
    dialect: 'postgres',
    dialectModule: pg,
    host: 'dpg-d4o44kngi27c73dtk6hg-a',
    port: '5432',
    database: 'letta_db',
    username: 'user',
    password: 'C5qTgkR0djSkDJQrdxnVVTFoBtbg4Voc'
});

export default mysql;
