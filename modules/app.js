const http = require('http')
const server = http.createServer((req , res)=>{
    if(req.url === '/'){
        res.write("Hello world");
        res.end();
    }
    if(req.url === '/somthing'){
        res.write(JSON.stringify([1,2,3,4,5]));
        res.end();
    }
});


server.listen(3000);

console.log("port 3000");