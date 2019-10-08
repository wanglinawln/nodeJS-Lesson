const http=require("http");
const querystring=require("querystring");
var arg1=process.argv[2];
var arg2=process.argv[3];
var infor={"username":arg1,"password":arg2};
var str=querystring.stringify(infor);
var options={
    host:"localhost",
    port:8081,
    path:"/",
    method:'post'
}

var req=http.request(options,function(res){});

req.write(str);
req.end();