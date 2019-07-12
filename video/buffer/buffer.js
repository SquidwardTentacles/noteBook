// 创建一个buffer实例 new buffer不推荐使用 静态方法
// let buf = new Buffer(5)
// let buf = Buffer.alloc(5);
// let buf = Buffer.from('buffer', 'utf8');
// console.log(buf);
// 静态方法 是否支持某种编码
// console.log(Buffer.isEncoding('utf8'));
// console.log(Buffer.isEncoding('gbk'));
// 判断是否是buffer对象
// let buf = Buffer.from('hello');
// console.log(Buffer.isBuffer(buf));
// console.log(Buffer.isBuffer({}));
// 返回特定编码的字节长度 byte 字节
// let buf = Buffer.from('中国');
// console.log(Buffer.byteLength(buf));
// console.log(buf.toString());
// concat buffer拼接
// let buf1 = Buffer.alloc(3);
// let buf2 = Buffer.alloc(5);
// let buf3 = Buffer.concat([buf1, buf2]);
// console.log(Buffer.byteLength(buf3));
// let buf1 = Buffer.from('tom');
// let buf2 = Buffer.from('jerry');
// let buf3 = Buffer.concat([buf1, buf2]);
// console.log(buf3.toString());
// console.log(Buffer.byteLength(buf3));

// 实例方法
// write() 写入方法 write('string',从第几个位置开始写入,写入内容长度,编码格式) 除string外其它参数可选
// let buf = Buffer.alloc(5);
// console.log(buf);
// buf.write('hello', 2, 2);
// console.log(buf);
// slice() 截取参数一截取开始位置 参数二 截取结束位置
// let buf = Buffer.from('hello');
// let buf1 = buf.slice(2, 3);
// console.log(buf === buf1);

// console.log(buf1.toString());
// toString()

// toJSON()
// let buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
// let buf = Buffer.from('hello');
// console.log(JSON.stringify(buf));
// let buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
// const jsons = JSON.stringify(buf);
// const json = JSON.parse(jsons, (key, value) => {
//   return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
// });
// console.log(json);

