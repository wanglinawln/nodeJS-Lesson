const fs=require("fs");
const path=require("path");
var file=process.argv[2];
var filePath=path.join(__dirname,"/"+file);
if(fs.existsSync(filePath)){
    var statObj=fs.statSync(filePath);
    if(statObj.isFile()){
        fs.unlinkSync(filePath);
    }
    else{
        deleteDir(filePath);
    }
}
else{
    console.log("文件不存在");
}

function deleteDir(folder){
    var files=fs.readdirSync(folder);
    for(var i=0;i<files.length;i++){
        var file=path.join(folder,files[i]);
        if(fs.statSync(file).isFile()){
            fs.unlinkSync(file);
            continue;
        }
        if(fs.statSync(file).isDirectory()){
            deleteDir(file);
        }
    }
    fs.rmdirSync(folder);
}

