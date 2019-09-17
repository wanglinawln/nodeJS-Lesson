var d=require("./dog.js");
var dog1=new d.Dog("taidi",4);
dog1.on("bark",function(){
    console.log(this.dogName+" barked! energy:"+this.energy);
})
var dog2=new d.Dog("zangao",8);
dog2.on("bark",function(){
    console.log(this.dogName+" barked! energy:"+this.energy);
})