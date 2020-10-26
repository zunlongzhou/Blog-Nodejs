var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var ArticleModel = mongoose.model('Article');
var URL = require('url');

/* GET home page. */
router.get('/post', function(req, res, next) {
    res.render('postInvitation', { title: 'Express' });
});
router.get('/detail/:aid', function(req, res, next) {
    res.render('invitation', { title: 'Express' });
});

router.get('/getArticle', function(req, res) {
    ArticleModel.find().exec(function(err, data, count) {
        res.send(data);
    });
});
router.get('/getSelfArticle', function(req, res) {
    console.log("=")
    console.log(req.cookies.userId)
    ArticleModel.find({authorid: req.cookies.userId}).exec(function(err, data, count) {
        if(err) throw err;
        res.send(data);
    })
})

router.get('/getDetail', function(req, res) {
    console.log('req.query', req.query);
    ArticleModel.find({_id: require('mongodb').ObjectID(req.query.articleid)}).exec(function(err, data, count) {
        res.send(data);
    });
});
router.post('/addArticle', function(req, res) {
    console.log('addar req.body', req.body);
    new ArticleModel({ //实例化对象，新建数据
        author: req.body.author,
        authorid: req.cookies.userId,
        title: req.body.title,
        content: req.body.content,
        comment: [],
    }).save(function(err, res, count) { //保存数据
        console.log('内容', res, '数量', count); //打印保存的数据
    });
    res.send(true)
});
router.post('/update', function(req, res) {
    ArticleModel.updateOne({_id: require('mongodb').ObjectID(req.body.articleid)}, {$set:{content:req.body.content}}, function(err, result) {
        if(err) throw err;
        console.log(result);
        res.send(true);
    })
    console.log("===================================")
})

router.post('/comment', function(req, res) {
    console.log('req.body', req.body);
    ArticleModel.updateOne({_id: require('mongodb').ObjectID(req.body.articleid)},
        {$push:
                {comment: {content: req.body.content,user: req.cookies.userName,userid:req.cookies.userId,time:Date().toString('T')}}
                },function (err, obj) {
        if (err) throw err;
    });
    res.send(true);
})

router.get('/like', function(req, res) {
    console.log(req.query);
    var num=parseInt(req.query.likenum)+1;
    console.log(typeof(num));
    ArticleModel.updateOne({_id: require('mongodb').ObjectID(req.query.articleid)},{$set:{like: num}}, function(err, obj) {
        if(err) throw err;
        })
    res.send(true);
})
router.get('/delete', function(req, res) {
    console.log("delete"+req.query.articleid)
    ArticleModel.deleteOne({_id: require('mongodb').ObjectID(req.query.articleid)}, function(err,obj) {
        if(err) throw err;
        console.log("删除成功！");
    })
    res.send(true);
})
router.get('/search', function(req, res) {
    var query={};
    console.log(req.query)
    if(req.query.searchtext) {
        query['title']=new RegExp(req.query.searchtext);
    }
    console.log(query)
    ArticleModel.find(query).exec(function(err, data, count) {
        res.send(data);
    })
})

module.exports = router;
