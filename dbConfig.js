/* Fichero de configuracion de BD mySQL */

const mysql = require('mysql');
require('dotenv').config();

// Conectamos con la BD cuando arranque la applicacion

const connect = () => {

    const pool = mysql.createPool({

        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.PORTDATA,
        database: process.env.DATABASE,
    });

    // gracias a  global., en cualquier parte de mi proyecto, si accedo a una variable db que acabo de crear, me va a recuperar el valor del pool

    global.db = pool;
};

module.exports = connect;

/* Fin fichero de configuracion de BD mySQL */