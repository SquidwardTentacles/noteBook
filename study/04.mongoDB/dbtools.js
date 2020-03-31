// const MongoClient = require('mongodb').MongoClient;

// const test = require('assert');

// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'test';

// // Connect using MongoClient
// // 客户端连接服务器
// // MongoClient.connect(url, function (err, client) {
// //   if (err) throw err //连接异常
// //   // 获取db对象 再获取集合对象（操作数据）
// //   const col = client.db(dbName).collection('createIndexExample1');
// //   // Insert a bunch of documents
// //   // 插入操作
// //   col.insert([{ a: 1, b: 1 }
// //     , { a: 2, b: 2 }, { a: 3, b: 3 }
// //     , { a: 4, b: 4 }], { w: 1 }, function (err, result) {
// //       if (err) throw err //插入异常
// //       col.find().toArray(function (err, docs) {
// //         if (err) throw err   //查询异常
// //         console.log(docs);
// //         client.close() //关闭连接（放回mongoDB的连接池）
// //       })
// //     });
// // });

// // // 连接数据库 
// // MongoClient.connect(url, function (err, client) {
// //   if (err) throw err
// //   // 获取db对象 再获取集合 
// //   const col = client.db('testSelf').collection('test1');
// //   // 插入操作 
// //   col.insert([{ a: 1, b: 2 }], function (err, result) {
// //     if (err) throw err
// //     // 查询
// //     col.find().toArray(function (err, docs) {
// //       if (err) throw err
// //       console.log(docs);
// //       client.close()

// //     })
// //   })
// // })
// var obj = {}
// // 连接函数封装 
// function _connect (callback) {
//   MongoClient.connect(url, function (err, client) {
//     if (err) throw err
//     callback(client)
//   })
// }

// // 插入数据 
// obj.insert = function (Cname, arrDate, fn) {
//   _connect(function (client) {
//     const col = client.db(dbName).collection(Cname)
//     col.insert(arrDate, function (err, result) {
//       // 将数据和错误交由外部处理 
//       fn(err, result)
//       // 关闭连接 
//       client.close()
//     })
//   })
// }

// // obj.insert('test01', [{ age: 1 }], (err, data) => {
// //   console.log(err, data);

// // })

// // 查询 
// obj.find = function (collectionName, filter, fn) {
//   _connect(function (client) {
//     const col = client.db(dbName).collection(collectionName)
//     col.find(filter).toArray(function (err, docs) {
//       client.close()
//       fn(err, docs)
//     })
//   })
// }

// // obj.find('test01', { age: 1 }, (err, data) => {
// //   console.log(err, data);

// // })
// // 更新
// obj.update = function (collectionName, filter, update, fn) {
//   _connect(function (client) {
//     const col = client.db(dbName).collection(collectionName)
//     col.update(filter, { $set: update }, function (err, result) {
//       client.close()
//       fn(err, result)
//     })
//   })
// }
// // obj.update('test01', { age: 2 }, { age: 12 }, function (err, result) {
// //   console.log(err, result);

// // })

// // 删除 
// obj.delete = function (collectionName, fliter, fn) {
//   _connect(function (client) {
//     const col = client.db(dbName).collection(collectionName)
//     col.deleteMany(fliter, function (err, result) {
//       client.close()
//       fn(err, result)
//     })
//   })
// }
// // obj.delete('test01', { age: 12 }, (err, result) => {
// //   console.log(err, result);

// // })

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let obj = {}
let dbName = 'test'
// 封装连接函数
function _connect (callback) {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err
    callback(client)
  })
}
// 增 
obj.insert = function (collectionName, data, fn) {
  _connect(function (client) {
    const col = client.db(dbName).collection(collectionName)
    col.insert(data, function (err, result) {
      client.close()
      fn(err, result)
    })
  })
}

// obj.insert('test01', { age: 24 }, (err, result) => {
//   console.log(err, result);
// })

// 删 
obj.delect = function (collectionName, fliter, fn) {
  _connect(function (client) {
    const col = client.db(dbName).collection(collectionName)
    col.deleteMany(fliter, function (err, result) {
      client.close()
      fn(err, result)
    })
  })
}
// obj.delect('test01', { age: 24 }, function (err, result) {
//   console.log(err, result);

// })

// 查 
obj.find = function (collectionName, fliter, fn) {
  _connect(function (client) {
    const col = client.db(dbName).collection(collectionName)
    col.find(fliter, function (err, result) {
      client.close()
      fn(err, result)
    })
  })
}

// obj.find('test01', { age: 24 }, function (err, result) {
//   console.log(err, result);

// })

// 改 
obj.update = function (collectionName, fliter, updateData, fn) {
  _connect(function (client) {
    const col = client.db(dbName).collection(collectionName)
    col.update(fliter, updateData, function (err, result) {
      client.close()
      fn(err, result)
    })
  })
}
obj.update('test01', { age: 24 }, { age: 18 }, function (err, result) {
  console.log(err, result);

})

// 模块的导出 
module.exportS = obj