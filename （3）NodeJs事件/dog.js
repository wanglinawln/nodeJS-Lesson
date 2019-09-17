//原生模块，核心模块
const events=require("events");
var EventEmitter=events.EventEmitter;

function Dog(dogName,energy){
    EventEmitter.call(this);
    this.dogName=dogName;
    this.energy=energy;
    var that=this;
    var bark=setInterval(function(){
        if(that.energy>=0){
            that.emit("bark");
            that.energy-=1;
        }
        else{
            clearInterval(bark);
        }
    },1000)
}
Dog.prototype.__proto__=EventEmitter.prototype;
module.exports={
    Dog:Dog
}