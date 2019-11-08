var express = require('express');
var router = express.Router();
var data=require("../file.js");
var list=data.chapterList;
var user=data.userList[0];
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { title: 'Express' });
});

// router.get('/list', function(req, res, next) {
//   /**
//    * render页面的渲染
//    * 读取ejs文件的内容，将文件中的占位符<%=username %>,输出时加“=”
//    * 替换成后端给定的数据（也就是render的第二个参数）{username:"zhangsan"}
//    * 再将文件中的代码内容响应到客户端去
//    */
//   res.render("list1.ejs",{username:"zhangsan",newList:[
//     {newId:1,newTitle:"新闻1"},
//     {newId:2,newTitle:"新闻2"},
//     {newId:3,newTitle:"新闻3"},
//   ]});
// });

router.get('/list', function(req, res, next) {
    res.render("list.ejs",{title:"list"});
});
router.get('/addChapter',function(req,res,next){
  res.render("addChapter.ejs",{title:"add"});
})
var list=[];
router.post("/addChapter",function(req,res,next){
  var title=req.body.title;
  var content=req.body.content;
  console.log(title,content);
  list.push({title,content});
  res.render("chapterList.ejs",{result:list});
})
router.post('/login', function(req, res, next) {
  var username=req.body.username;
  var pwd=req.body.pwd;
  console.log(username,user.username,pwd,user.username);
  if(username===user.username&&pwd===user.pwd){
    res.render("list.ejs",{title:"list"});
  }
  else{
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf8"});
    res.end("用户名密码错误！");
  }
});
router.get("/detail",function(req,res,next){
  res.render("chapter.ejs",{ title: 'chapter' });
})
module.exports = router;
