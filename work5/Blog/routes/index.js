var express = require('express');
var router = express.Router();
var data=require("../data.json");
var list=data.chapterList;
var user=data.users[0];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.ejs', { title: 'Express' });
});
router.get("/login",function(req,res,next){
  res.render("login.ejs",{user:user});
});
router.get("/list",function(req,res,next){
  res.render("list.ejs",{list:list});
});
router.post('/signin', function(req, res, next) {
  var username=req.body.username;
  var pwd=req.body.pwd;
  console.log(username,user.username,pwd,user.password);
  if(user.username===username&&user.password===pwd){
    res.render("list.ejs",{list:list});
  }
  else{
    res.writeHead(200,{"Content-Type":"text/plain;charset=utf8"});
    res.end("用户名或密码错误");
  }
});
module.exports = router;
