var mysql = require('mysql');
const { dbConfig } = require('../config')
var pool = mysql.createPool(dbConfig);
let db = {}
db.q = function (sql, data, callback) {
  return new Promise((resolve, reject) => {
    // 从连接池中取出链接
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      // Use the connection
      connection.query(sql, data, function (error, results, fields) {
        // 释放链接
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(results)
      });
    });
  })
}
module.exports = db