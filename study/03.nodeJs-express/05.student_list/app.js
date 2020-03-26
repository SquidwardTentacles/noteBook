const express = require('express')
const app = express()
const router = express.Router()

// 引入处理文件的第三方中间件 formidable 
const formidable = require('formidable')
const path = require('path')

// 注册模板引擎 
app.engine('.html', require('express-art-template'))
// 配置默认的渲染引擎    
app.set('view engine', '.html')
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})
let students = [
  { name: '杀马特', img: 'imgs/1.jpg' }
]

// 处理静态文件 
app.use(express.static('./public'))

router.get('/', (req, res) => {
  res.render('index.html', {
    students
  })
}).post('/add', (req, res) => {
  const form = new formidable.IncomingForm();
  // 修改文件的保存目录 
  form.uploadDir = path.join(__dirname, 'public', 'imgs')
  // 保持原有后缀名 
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    // 拿到用户名
    console.log(fields.name);
    let userName = fields.name
    let imgSesson = path.parse(files.avater.path).base
    // console.log(files.avater.path);  
    // 拿到文件的名称
    console.log(path.parse(files.avater.path).base);
    students.push({ name: userName, img: 'imgs' + imgSesson })
    console.log(students);
    res.redirect('/')
  });

  return;
})

app.use(router)

app.listen(8888, () => {
  console.log('running........');

})