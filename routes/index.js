var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var URL = require('url');
var fs = require("fs");
const path=require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/re', function(req, res, next) {
  res.render('register', { title: 'Express'});
})
router.get('/header', function(req, res, next) {
  res.render('header', { title: 'Express' });
});
router.post('/login', function(req, res) {
  console.log('req.body', req.body);
  UserModel.find({username: req.body.username,password: req.body.password}).exec(function(err, data, count) {
    if(data.length>0){
      res.cookie("userName",data[0].username,{maxAge: 9000000, httpOnly: true});
      res.cookie("userId",data[0]._id,{maxAge: 9000000, httpOnly: true});
    }
    res.send(data);
  });
});
router.get('/logout', function(req,res) {
  res.clearCookie('userName')
  res.clearCookie('userId')
  res.send(true);
})
router.get('/getcookie',function(req, res) {
  var obj={};
  obj.username=req.cookies.userName;
  obj.userId=req.cookies.userId;
  res.send(obj);
})
router.post('/register', function(req, res) {
  console.log('req.body', req.body);
  let id;
  new UserModel({ //实例化对象，新建数据
    username: req.body.username,
    password: req.body.password,
    mailbox : req.body.mail,
  }).save(function(err, res, count) { //保存数据
    if(err) throw err;
    id=res._id;
    console.log('内容', res, '数量', count); //打印保存的数据
    console.log(id);
    var fileName = "userInit.png";

    var sourceFile = path.join("./public/images/user/", fileName);
    var destPath = path.join("./public/images/user/", id+".jpg");

    var readStream = fs.createReadStream(sourceFile);
    var writeStream = fs.createWriteStream(destPath);
    readStream.pipe(writeStream);
  });

  res.send(true);
});

module.exports = router;
