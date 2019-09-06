setInterval(function(){
    function loop(){
        console.log("I will loop forever");
    }
    loop();
},500)

setTimeout(function(){
    console.log("Game over");
    process.exit();
},5000)