var base64Str="emhhbmdzYW46MTIzNDU2";
var buf1=Buffer.from(base64Str,"base64");
var arr=buf1.toString("utf8").split(":");
console.log("用户名："+arr[0]+"密码："+arr[1]);