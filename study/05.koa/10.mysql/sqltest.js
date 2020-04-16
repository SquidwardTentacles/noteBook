const db = require('./app')

db.q('select * from goodsinfo where id = ?', [97], function callback (err, data) {
  console.log(err, data);

})