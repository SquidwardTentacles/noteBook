const db = require('./db')
exports.saveData = (req,res)=> {
    // console.log(req);
    let dobj = req.body
    let sql = 'insert into indexdata set ?'
    dobj = JSON.stringify(dobj)
    let data = [{text:dobj}]
    db.base(sql,data,res=>{
        console.log(res);
        
    })
}