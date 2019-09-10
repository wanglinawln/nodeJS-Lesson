function circumference(r){
    return 2*Math.PI*r;
}
function area(r){
    return Math.PI*r*r;
}
var cir={
    circumference:circumference,
    area:area
}
module.exports={
    cir:cir
}