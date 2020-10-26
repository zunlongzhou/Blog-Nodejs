var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var formidable=require("formidable");
var fs = require("fs");
const path=require('path');
//上传图片的模板
var multer=require('multer');
//生成的图片放入uploads文件夹下
var upload=multer({dest:'uploads/'})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userinfo', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.get('/getinfo', function(req, res, next) {
  UserModel.find({_id: require('mongodb').ObjectID(req.cookies.userId)}).exec(function(err, data, count) {
    res.send(data);
  });
})

router.post('/upload',upload.single('test'), function(req, res, next) {
  //读取文件路径
  fs.readFile(req.file.path,(err,data)=>{
    //如果读取失败
    if(err){return res.send('上传失败')}
    let name=req.cookies.userId;
    //拓展名
    let extname='jpg'
    //拼接成图片名
    let keepname=name+'.'+extname
    //三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数
    fs.writeFile(path.join(__dirname,'../public/images/user/'+keepname),data,(err)=>{
      if(err){return res.send('写入失败')}
      res.send({err:0,msg:'上传ok'})
    });
  });
})
module.exports = router;
