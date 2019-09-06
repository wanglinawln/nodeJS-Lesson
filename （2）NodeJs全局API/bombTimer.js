function Bomb(){};
Bomb.prototype.explode=function(){
    console.log(this.message)
};
Bomb.prototype.message="bomb!!!";
var bomb=new Bomb();
setTimeout(function(){
    bomb.explode();
},2000)
