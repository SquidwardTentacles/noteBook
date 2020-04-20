const musicModel = require('../models/music')
const path = require('path')
//添加 更新音乐方法提取
function optUpload (ctx) {
  // 保存文件信息 歌曲和歌词
  let file = ctx.request.files.file
  // 歌词可以不上传
  let filelrc = ctx.request.files.filelrc ? ctx.request.files.filelrc : ''
  // 歌曲名称等的附加信息
  let { title, singer, time } = ctx.request.body
  // 声明一个对象保存歌曲信息

  if (!file) {
    ctx.throw('歌曲必须上传')
    return
  }

  let fileBase = '/public/files/'
  let saveSingObj = {
    title: title ? title : file.name,
    singer,
    time,
    // 保存歌曲的文件网络路径 
    file: fileBase + path.parse(file.path).base,
    // 保存歌词文件的网络路径 歌词参数可选
    filelrc: filelrc.path ? fileBase + path.parse(filelrc.path).base : 'no upload file',
    uid: 1
  }
  return saveSingObj
}
module.exports = {
  // 显示音乐首页
  index: async (ctx, next) => ctx.render('index'),
  // 音乐编辑页面
  edit: async (ctx, next) => ctx.render('edit'),
  // 添加音乐页面
  add: async (ctx, next) => ctx.render('add'),
  // 添加音乐操作
  addMusic: async (ctx, next) => {

    let musicAddback = await musicModel.musicAdd(optUpload(ctx))
    if (musicAddback.affectedRows === 1) {
      ctx.body = {
        code: 001, msg: '音乐添加成功'
      }
    } else {
      ctx.body = {
        code: 002, msg: '音乐添加失败'
      }
    }

  },
  // 更新音乐
  uploadMusic: async (ctx, next) => {
    let uploadMObj = optUpload(ctx)
    // 更新音乐需要拿到id
    uploadMObj.id = parseInt(ctx.request.body.id)
    // 进行数据库操作
    let uploadBack = await musicModel.uploadMusic(uploadMObj)
    if (uploadBack.affectedRows === 1) {
      ctx.body = { code: 001, msg: '音乐更新成功' }
    } else {
      ctx.body = { code: 002, msg: '音乐更新失败' }
    }
  }
}