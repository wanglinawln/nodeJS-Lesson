const http=require("http");
const fs=require("fs");
const url=require("url");
const cheerio=require("cheerio");
const https=require("https");

http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true);
    var pathName=urlObj.pathname;
    if(pathName=='/'){
        var fileContent=fs.readFileSync("index.html");
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(fileContent);
        res.end();
    }
    else if(pathName=="/getlist"){
        var option={
            hostname: 'maoyan.com',
            path: '/films',
            headers: {
              'Accept':'*/*',
              'Accept-Encoding':'utf-8',
              'Accept-Language':'zh-CN,zh;q=0.8',
              'Connection':'keep-alive',
              'Host':'maoyan.com',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
            }
        };
        
        https.get(option,function(resObj){
            var result="";
            resObj.on("data",function(chunk){
                result+=chunk;
            })
            resObj.on("end",function(){
                const $=cheerio.load(result);
                var arr=[];
                $("dd").each(function(index,el){
                    const element=$(el);
                    var movie={};
                    var a=element.find(".movie-item-title a");
                    var d=element.find(".channel-detail-orange");
                    movie.movieId=a.attr("data-val").slice(9,-1);
                    movie.movieName=a.text();
                    movie.movieRange=d.text();
                    arr.push(movie);
                })
                var arr1=JSON.stringify(arr);
    
                // res.writeHead(200,{"Content-Type":"text/plain"});
                res.write(arr1);
                res.end();
            })
        })
    }
}).listen(8081)