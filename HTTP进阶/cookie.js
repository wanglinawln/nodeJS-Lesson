const http=require("http");
const path=require("path");
const url=require("url");
const fs=require("fs");
const querystring=require("querystring");

http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true);
    switch(urlObj.pathname){
        case '/':
            showHome(req,res);
            break;
        case '/login':
            loginIn(req,res);
            break;
        case '/login_bg.jpg':
            showImage(res);
            break;
    }
}).listen(8081)

function showLogin(res){
    var filePath=path.join(__dirname,"login.html");
    var fileContent=fs.readFileSync(filePath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(fileContent);
    res.end();
}

function showList(res){
    var filePath=path.join(__dirname,"list.html");
    var fileContent=fs.readFileSync(filePath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(fileContent);
    res.end();
}

function showHome(req,res){
    var cookie=req.headers["cookie"];
    if(cookie==undefined){
        showLogin(res);
    }
    else if(cookie.indexOf("username=admin")>=0){
        showList(res);
    }
    else{
        showLogin(res);
    }
}

function loginIn(req,res){
    var formData="";
    req.on("data",function(chunk){
        formData+=chunk;
    });

    req.on("end",function(){
        var formObj=querystring.parse(formData);
        if(formObj.username=="admin"&&formObj.pwd=="admin"){
            //设置cookie信息
            res.setHeader("Set-Cookie","username=admin;max-age=60");
            res.writeHead(302,{"Location":"/"});
            res.end("login success");

        }
        else{
            res.end("login error");
        }
    })
}

function showImage(res){
    var filePath=path.join(__dirname,"login_bg.jpg");
    var fileContent=fs.readFileSync(filePath);
    res.writeHead(200,{"Content-Type":"image/jpeg"});
    res.write(fileContent);
    res.end();
}