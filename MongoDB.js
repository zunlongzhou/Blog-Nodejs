let mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/bugbank');

var db=mongoose.connection;
db.on('error', function callback() {
    console.log("Database Connection Error!");
});
db.once('open', function callback() {
    console.log('connected!');
});

var Schema = mongoose.Schema;

var userSchema = Schema({
    username : {type : String, default : '匿名用户'},
    password    : {type : String},
    userid  : {type : Number, default: 1},
    salt    : {type: String, default: 'salt_defualt'},
    registerTime     : {type : String, default: Date().toString('T')},
    mailbox     : {type: String, default: '未绑定邮箱'},
    sex     : {type: String, default : '秘密'},
    age      : {type : Number, default: 0}
})

var articleSchema = Schema({
    articleid   : {type: Number},
    title   : {type : String},
    content     : {type : String},
    posttime    : {type : String, default: Date().toString('T')},
    author      : {type : String, default: '匿名作者'},
    authorid    : {type : String},
    like        : {type : Number, default: 0},
    comment     : {type : Array},
})

var User = mongoose.model('User', userSchema);
var article = mongoose.model('Article', articleSchema);
// var x = new article({
//     articleid   : 8,
//     title   : '好多篇文章',
//     content     : '啊啊啊啊啊啊文章内容有很多，这里是内容，然后可以一直写一直写一直写一直写一直写比如说，你想怎么写就怎么写文章内容有很多，这里是内容，然后可以一直写一直写一直写一直写一直写比如说，你想怎么写就怎么写文章内容有很多，这里是内容，然后可以一直写一直写一直写一直写一直写比如说，你想怎么写就怎么写,文章内容有很多，这里是内容，然后可以一直写一直写一直写一直写一直写比如说，你想怎么写就怎么写',
//     author      : '月关',
//     authorid    : 7,
//     like        :10,
//     comment     : [{
//         conmentid: 2,
//         content: '写的很棒',
//         user: 'zhou',
//         userid: 1,
//         time: Date.now(),
//         comment : []
//     }],
// }).save();
module.exports = mongoose;