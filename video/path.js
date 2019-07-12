// const path = require('path');
// 获取路径的最后一部分
// console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
// console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));

// 获取路径
// console.log(__dirname);
// console.log(path.dirname('/abc/qqq/www/aaa/d'));

// 获取文件的扩展名
// console.log(path.extname('index.html'));

// 路径的格式化处理
// Format() obj=>str
// parse() str=> obj
// let obj = path.parse(__filename);
// console.log(obj);
// { root: 'D:\\',根路径
//   dir: 'D:\\zsbback\\nodeStudy\\video',全路径
//   base: 'path.js', 文件名
//   ext: '.js',扩展名
//   name: 'path' }文件名
// console.log(path.format(obj));

// isAbsolute() 是否为绝对路径
// let pathurl = __filename;
// console.log(path.isAbsolute(pathurl));

// 连接路径 ..表示上一级
// console.log(path.join('/foo', 'bar/', 'baz/asdf', 'quux', '..'));

// 规范化路径` normalze
// console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));

// 返回相对路径
// console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));