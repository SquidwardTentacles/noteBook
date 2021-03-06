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
  index: async (ctx, next) => {
    let uid = ctx.query.uid
    if (!uid) {
      ctx.body = { code: 002, msg: 'id为必选字段' }
      return
    }
    let sqlback = await musicModel.selectMusicByuid(uid)
    if (!sqlback.length) {
      ctx.body = { code: 002, msg: '未查询到相关歌曲信息' }
      ctx.render('index')
      return
    }
    ctx.render('index', {
      music: sqlback
    })
  },
  // 音乐编辑页面
  edit: async (ctx, next) => {
    let id = ctx.query.id
    let sqlback = await musicModel.musicEdit(id)
    if (!sqlback.length) {
      ctx.body = { code: 002, msg: '未查询到歌曲信息' }
      return
    }
    ctx.render('edit', {
      music: sqlback[0]
    })

  },
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
    console.log(ctx.session.user);

    let uploadMObj = optUpload(ctx)
    // 更新音乐需要拿到id
    if (!ctx.request.body.id) {
      ctx.throw('id为必选字段')
      return
    }
    uploadMObj.id = parseInt(ctx.request.body.id)
    // 进行数据库操作
    let uploadBack = await musicModel.uploadMusic(uploadMObj)
    if (uploadBack.affectedRows === 1) {
      ctx.body = { code: 001, msg: '音乐更新成功' }
    } else {
      ctx.body = { code: 002, msg: '音乐更新失败' }
    }
  },
  // 删除音乐
  /** 
   * id
   */
  deleteMusic: async (ctx, next) => {
    let id = parseInt(ctx.query.id)
    if (!id) {
      ctx.throw('id为必选字段')
      return
    }
    let backSql = await musicModel.deleteMusic(id)
    if (backSql.affectedRows !== 1) {
      ctx.body = { code: 002, msg: '歌曲删除失败' }
      return
    }
    ctx.body = { code: 001, msg: '歌曲删除成功' }
  }
}