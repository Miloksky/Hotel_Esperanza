const mysql = require("mysql2");

const pool = mysql.createPool({
    host:process.env.HOST_DB,
    user:process.env.USER_DB,
    password:process.env.PASS_DB,
    port:process.env.PORT_DB,
    database:process.env.DB
});

pool.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

module.exports = pool.promise();
