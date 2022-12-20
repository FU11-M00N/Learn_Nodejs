const http = require('http');

http.createServer((req,res)=>{
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { 'Set-Cookie' : 'mycookie=test'});
    res.end('Hello Cokkie');
})
    .listen(8083,() => {
        console.log('8083에서 대기중 입니다');
    });