const http=require("http");
const path=require("path");
const fs=require("fs");
var name=process.argv[2];
var filePath=path.join(__dirname,"/"+name);
http.createServer((req,res)=>{
    if(name==undefined){
        // filePath=path.join(__dirname,"/fileReader2.js");
        filePath=process.argv[1];
    }
    if(fs.existsSync(filePath)){
        fs.open(filePath,"r+",(err,fd)=>{
            if(err){
                console.log(err);
            }
            else{
                var len=fs.statSync(filePath).size;
                var buf=Buffer.alloc(len);
                fs.read(fd,buf,0,len,0,(err, bytesRead, buffer)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.end(buffer.toString());
                    }
                    fs.close(fd,(err)=>{
                        if(err){
                            console.log(err);
                        }
                    });         
                });
            }
        });   
    }
    else{
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
        res.end("文件不存在");
    }
    
}).listen(8081);