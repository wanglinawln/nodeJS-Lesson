const events=require("events");
const util=require("util");
var EventEmitter=events.EventEmitter;


function Radio(name,HZ){
    EventEmitter.call(this);
    this.name=name;
    this.HZ=HZ;
    this.play=function (){
        console.log('"'+this.name+'" '+this.HZ+" opened");
        setTimeout(function(){
            console.log("lalala...");
        },2000)
    }
    this.stop=function(){
        console.log('"'+this.name+'" '+this.HZ+" closed");
    }
}
util.inherits(Radio,EventEmitter);
module.exports={
    Radio:Radio
}

/*
继承:
1.Parent.call(this)
Child.prototype.__proto__=Parent.prototype
2.Child extends Parent()
3.util.inherits(Child,Parent)
*/