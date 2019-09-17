var r=require("./radio.js");
var radio=new r.Radio("music radio","FM 106.7");
radio.on("play",radio.play);
radio.emit("play");
radio.on("stop",radio.stop);
setTimeout(function(){
    radio.emit("stop");
},2000)


