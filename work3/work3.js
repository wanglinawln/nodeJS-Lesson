const http=require("http");
const url=require("url");
const fs=require("fs");
const path=require("path");
const queryString=require("querystring");
var chapterList=require("./file.js").chapterList;
var userList=require("./file.js").userList;


http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    switch(pathname){
        case "/list":
            show(res,"chapterList.html");
            break;
        case "/getlist":
            showList(res);
            break;
        case "/detail":
            show(res,"chapter.html");
            break;
        case "/getDetail":
            showDetail(urlObj,res);
            break;
        case "/login":
            show(res,"login.html");
            break;
        case "/onLogin":
            login(req,res);
            break;
        case "/delChapter":
            delChapter(urlObj,res);
            break;
        case "/listmanager":
            show(res,"list.html");
            break;
        case "/addChapter":
            show(res,"addChapter.html");
            break;
        case "/add":
            add(req,res);
            break;
        default:
            var filePath=path.join(__dirname,pathname);
            if(!fs.existsSync(filePath)){
                res.writeHead(404,{"Content-Type":"text/plain"});
                res.write("404 not found!");
                res.end();
            }
            else{
                if(!fs.statSync(filePath).isFile()){
                    res.writeHead(404,{"Content-Type":"text/plain"});
                    res.write("404 not found!");
                    res.end();
                }
                else{
                    var fileContent=fs.readFileSync(filePath);
                    var end=path.extname(filePath).toLowerCase();
                    if(end===".png"){
                        res.writeHead(200,{"Content-Type":"image/png"});
                    }
                    else if(end===".jpg"||end===".jpeg"){
                        res.writeHead(200,{"Content-Type":"image/jpeg"});
                    }
                    else if(end===".gif"){
                        res.writeHead(200,{"Content-Type":"image/gif"});
                    }
                    else if(end===".css"){
                        res.writeHead(200,{"Content-Type":"text/css"});
                    }
                    else if(end===".js"){
                        res.writeHead(200,{"Content-Type":"text/javascript"});
                    }
                    res.write(fileContent);
                    res.end(); 
                }
            }
            
            break;

    }
}).listen(8083);

function show(res,fileName){
    var listPath=path.join(__dirname,fileName);
    var listContent=fs.readFileSync(listPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(listContent);
    res.end();
}

function showList(res){
    res.writeHead(200,{"Content-Type":"text/plain"}) ;
    var listContent=JSON.stringify(chapterList);
    res.write(listContent);
    res.end();
}
function showDetail(urlObj,res){
    var chapterId=urlObj.query.chapterId;
    for(var i=0;i<chapterList.length;i++){
        if(chapterList[i].chapterId==chapterId){
            chapterList[i].views+=1;
            res.writeHead(200,{"Content-Type":"text/plain"}) ;
            res.write(JSON.stringify([chapterList[i]]));
            res.end();
            return ;
        }
    }
}

function login(req,res){
    var result="";
    req.on("data",function(chunk){
        result+=chunk;
    })
    req.on("end",function(){
        var data=queryString.parse(result);
        var username=data.username;
        var pwd=data.password;
        for(var i=0;i<userList.length;i++){
            if(userList[i].username==username&&userList[i].pwd==pwd){
                res.writeHead(200,{"Content-Type":"text/plain"}) ;
                res.write("success");
                res.end();
                return ;
            }
        }
        res.writeHead(200,{"Content-Type":"text/plain"}) ;
        res.write("fail");
        res.end();
    })
}

function add(req,res){
    var result="";
    req.on("data",function(chunk){
        result+=chunk;
    })
    req.on("end",function(){
        var data=queryString.parse(result);
        var title=data.title;
        var content=data.content;
        var date=new Date();
        var year=date.getFullYear();
            month=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
            day=date.getDate()<10?'0'+date.getDate():date.getDate();
        var obj={
            "chapterId": chapterList[chapterList.length-1].chapterId+1,
            "chapterName": title,
            "imgPath": "images/03.jpg",
            "chapterDes": content,
            "chapterContent": content,
            "publishTimer": year+"-"+month+"-"+day,
            "author": "admin",
            "views": 0
        }
        chapterList.push(obj);
        res.writeHead(200,{"Content-Type":"text/plain"}) ;
        res.end("success");
    })
}

function delChapter(urlObj,res){
    var chapterId=urlObj.query.chapterId;
    for(var i=0;i<chapterList.length;i++){
        if(chapterList[i].chapterId==chapterId){
            chapterList.splice(i, 1);
            res.writeHead(200,{"Content-Type":"text/plain"});
            res.write("success");
            res.end();
            return ;
        }
    }

    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write("fail");
    res.end();
}