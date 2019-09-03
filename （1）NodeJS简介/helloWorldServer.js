const http=require("http");

var server =http.createServer(function(req,res){
    /*
    http协议，协议的结构，协议的请求响应过程
    状态码
    */
    res.writeHead(200,{"Content-Type":"text/html"});
    // res.write("hello world");
    res.write("<h1>hello world</h1>");
    //响应结束
    res.end();
});

server.listen(8080);
console.log("8080");
/*
1.在电脑对应的路径文件夹的空白处，shift+右键，点击打开power shell窗口，运行js文件
2.输入命令：node 文件名.js
3.每次修改了js文件后，需要重新执行 node 文件名.js
4.在node中的js文件，必须得编译才能执行
5.webstorm
6.终端->新建终端->Ctrl+c->cd 文件夹->node 当前文件夹里的文件

*/ 