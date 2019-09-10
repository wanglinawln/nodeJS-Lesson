function circleFun(r){
    this.r=r;
    function circumference(){
        return 2*Math.PI*r;
    }
    function area(){
        return Math.PI*r*r;
    }
    return {circumference:circumference(),area:area()}
}

module.exports={
    circleFun:circleFun
}