const http=require("http");
const fs=require("fs");
const url=require("url");
const path=require("path");

http.createServer(function(req,res){
    var urlObj=url.parse(req.url);
    var pathName=urlObj.pathname;
    if(pathName=="/"){
        showIndex(res);
    }
    else if(pathName=="/list"){
        showList(res);
    }
    else if(pathName=="/image.png"){
        showImage(res);
    }
    else if(pathName=="/upload"&&req.method=="POST"){
        uploadFile(req,res);

    }
    else if(pathName.indexOf("upload")>=0&&req.method=="GET"){
        var imgSrc=path.join(__dirname,pathName);
        var imgContent=fs.readFileSync(imgSrc);
        res.writeHead(200,{"Content-Type":"image/png"});
        res.end(imgContent);
    }
    else if(pathName=="/getlist"){
        var files=fs.readdirSync(__dirname+"/upload");
        var fileStr=JSON.stringify(files);
        res.end(fileStr);
    }

}).listen(8081);

function showIndex(res){
    var indexPath=path.join(__dirname,"/index.html");
    var fileContent=fs.readFileSync(indexPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(fileContent);
    res.end();
}

function showList(res){
    var listPath=path.join(__dirname,"/list.html");
    var fileContent=fs.readFileSync(listPath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.write(fileContent);
    res.end();

}

function showImage(res){
    var imagePath=path.join(__dirname,"/image.png");
    var imageContent=fs.readFileSync(imagePath);
    res.writeHead(200,{"Content-Type":"image/png"});
    res.end(imageContent);
}

function uploadFile(req,res){
    var dataStr="";
    req.setEncoding("binary");
    req.on("data",function(chunk){
        dataStr+=chunk;
    })
    req.on("end",function(){
        var totalArr=dataStr.split("\r\n");
        var bufArr=totalArr.slice(4,totalArr.length-2);
        bufArr=bufArr.join("\r\n");
        var buf=Buffer.from(bufArr,"binary");
        var timer=(new Date()).getTime();
        fs.writeFileSync("./upload/"+timer+".png",buf,{"encoding":"binary"});
        res.end("submit success");
    })
}

/**
 * 地址栏中发起http请求 (get)
 * 超链接发起http (get)
 * 提交表单发起请求 (可以是get也可以是post)
 * ajax发起请求 (可以是get也可以是post)
 * <link href=""/> (get)
 * <script src=""> (get)
 * <img src=""/> (get)
 * background:url() (get)
 * 
 * get请求，向服务端传递的参数都在url里面呈现
 * http://localhost:8083/detail?chapterId=5&&name="lili"
 * var urlObj=url.parse(req.url,true);
 * urlObj.query.name
 * 
 * 
 * 
 * post请求，数据存储在请求体里面,提交表单
 * req.on("data",function(chunk){})
 * req.on("end",function(){})
 */