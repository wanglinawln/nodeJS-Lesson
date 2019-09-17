const stream=require("stream");
var Readable=stream.Readable;
function MyReadable(){
    Readable.call(this);
}
MyReadable.prototype.__proto__=Readable.prototype;

var reader =new MyReadable();
for(var i=97;i<123;i++){
    reader.push(String.fromCharCode(i)+" ");

}
reader.push(null);
reader.pipe(process.stdout);