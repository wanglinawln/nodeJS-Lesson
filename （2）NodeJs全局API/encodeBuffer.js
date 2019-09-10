var username=process.argv[2];
var password=process.argv[3];
if(username!=undefined&&password!=undefined){
    console.log("用户名:"+username+"密码:"+password);
    var loginBuf=username+":"+password;
    var buf1=Buffer.from(loginBuf,"utf-8");
    var base64Str=buf1.toString("base64");
    console.log("base64加密："+base64Str);
}
else{
    console.log("用户名和密码不能为空！");
}