var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'goods'
});

let db = {}
db.q = function (sql, data, callback) {
  // 取出链接
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err, null)
      return
    }; // not connected!

    // Use the connection
    connection.query(sql, data, function (error, results, fields) {
      // 释放链接 
      connection.release()
      callback(error, results)
        // console.log(fields);
        ;
    });
  });
}

module.exports = db