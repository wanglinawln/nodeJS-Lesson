const http=require("http");
const fs=require("fs");
const path=require("path");
const querystring=require("querystring");
var filePath=path.join(__dirname,"data.json");
var fileContent=fs.readFileSync(filePath);
var fileStr=JSON.parse(fileContent);

http.createServer(function(req,res){
    var result="";
    req.on("data",function(chunk){
        result+=chunk;
    })
    req.on("end",function(){
        result=querystring.parse(result);
        for(var i=0;i<fileStr.length;i++){
            if(result.username==fileStr[i].username&&result.password==fileStr[i].password){
                console.log("登录成功");
                return ;
            }
        }
        console.log("用户名、密码不正确");        
        // console.log(result);
    })
}).listen(8081);