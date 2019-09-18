const http =require("http");
const fs=require("fs");
const path=require("path");
var name=process.argv[2];
var filePath=path.join(__dirname,"/"+name);
if(name==undefined){
    // filePath=path.join(__dirname,"/fileReader3.js");
    filePath=process.argv[1];
}
http.createServer(function(req,res){
    if(fs.existsSync(filePath)){
        var readStream=fs.createReadStream(filePath);
        readStream.pipe(res);
    }
    else{
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
        res.end("文件不存在");
    }
}).listen(8081)