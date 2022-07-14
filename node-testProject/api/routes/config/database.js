const mysql = require("mysql");

const db_connection = () => {
  return new Promise((resolve, reject) => {
    var con = mysql.createPool({
      multipleStatements: true,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.MYSQL_DB,
      connectionLimit: 500,
      timezone: "+00:00",
      dateStrings: "date",
    });
    con.getConnection(function (err) {
      if (err) return reject(err);
      resolve(con);
    });
  });
};
module.exports = db_connection;
