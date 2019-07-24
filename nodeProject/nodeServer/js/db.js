var mysql = require("mysql");
exports.base = (sql, data, callback) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mybook"
  });

  connection.connect();

  connection.query(sql, data, (error, results, fields) => {
    if (error) throw error;
    callback(results);
  });
  connection.end();
};
