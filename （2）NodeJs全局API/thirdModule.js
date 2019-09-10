/*
npm(node package manager)包管理器
会有大量第三方上传的模块

他是一个远端的模块的服务器

安装模块：npm inatall 模块名称
回车，就回去npm服务器上查找该模块，如果存在该模块，就会下载到当前目录的node_mpdules文件夹中

（1）需要网络
（2）需要该模块在npm上实际存在

*/
const now=require("date-now");
console.log(now());