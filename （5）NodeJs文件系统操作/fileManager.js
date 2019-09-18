const path=require("path");
const fs=require("fs");
var i=0;
var filePath;
var arr=["请输入要创建的文件夹:","请输入要创建的文件:","请输入要删除的文件:"];
console.log(arr[0]);
process.stdin.on("data",function(data){
    var cmd=data.toString();
    var cmdArr=cmd.split(" ");
    switch(cmdArr[0]){       
        case "mkdir":
            fs.mkdirSync(cmdArr[1].slice(0,-2));
            console.log("文件目录创建成功");
            i++;
            break;
        case "touch":
            filePath=path.join(__dirname,"/filedir/"+cmdArr[1].slice(0,-2));
            fs.writeFileSync(filePath,"hello node");
            console.log("文件创建成功");
            i++;
            break;
        case "delete":
            filePath=path.join(__dirname,"/filedir/"+cmdArr[1].slice(0,-2));
            fs.unlinkSync(filePath);
            console.log("文件删除成功");
            process.exit();
        default:
            console.log("something error");
            break;
    }
    console.log(arr[i]);
})