var i=0;
var user={};
var arr=["name:","email:","qq:","mobile:"];
console.log("name:");
process.stdin.on("data",function(data){
    switch (i){
        case 0:
            user.name=data.toString();
            break;
        case 1:
            user.email=data.toString();
            break;
        case 2:
            user.qq=data.toString();
            break;
        case 3:
            user.mobile=data.toString();
            console.log(user);
            process.exit();
            break;
        default:
            break;
    }       
    i++;
    if(i<4){
        console.log(arr[i]);
    }
})
