/* Config file to BD mySQL */

const mysql = require('mysql');
require('dotenv').config();


const connect = () => {

    const pool = mysql.createPool({

        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.PORTDATA,
        database: process.env.DATABASE,
    });


    global.db = pool;
};

module.exports = connect;

/* END Config BD mySQL */