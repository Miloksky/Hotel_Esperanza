const mysql = require("mysql2");
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    port: process.env.PORT,
    database: process.env.DB
});

module.exports = pool.promise();;
