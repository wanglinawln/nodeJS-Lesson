var http=require("http");
var fs=require("fs");
var path=require("path");

http.createServer(function(req,res){
    var imgPath=path.join(__dirname+"/1.jpg");
    var imgBuffer=fs.readFileSync(imgPath);
    var base64Data=imgBuffer.toString("base64");
    var imgSrc="data:imgage/jpg;base64,"+base64Data;
    var htmlStr="<!DOCTYPE html><head></head>"+"<body><img src='"+imgSrc+"'/></body"+"</html>";
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(htmlStr);
    res.end();
}).listen("8081");
console.log("8081");