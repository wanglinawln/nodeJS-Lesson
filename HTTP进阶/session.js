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

var sessions={};

function showList(res){
    var filePath=path.join(__dirname,"list.html");
    var fileContent=fs.readFileSync(filePath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(fileContent);
    res.end();
}

function showHome(req,res){
    var cookie=req.headers["cookie"];
    console.log(cookie);
    if(cookie==undefined){
        
        showLogin(res);
        console.log(1);
    }
    else{
        cookie=cookie.trim();
        var cookieArr=cookie.split(",");
        var cookieObj={};
        for(var i=0;i<cookieArr.length;i++){
            var cookiePair=cookieArr[i].split("=");
            cookieObj[cookiePair[0].trim()]=cookiePair[1].trim();
        }
        var sessionId=cookieObj.sessionId;
        for(var key in sessions){
            if(key==sessionId){
                var session=sessions[key];
                if((new Date()).getTime()<session.exipire){
                    showList(res);
                }
                else{
                    showLogin(res);
                }
            }
        }
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
            var session={
                sessionId:(new Date()).getTime()+Math.random(),
                exipire:(new Date()).getTime()+60000,//多长时间过时,单位为毫秒
                username:"admin"
            }
            sessions[session.sessionId]=session;
            res.setHeader("Set-Cookie","sessionId="+session.sessionId);
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