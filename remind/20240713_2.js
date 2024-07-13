// http 모듈

const http = require('http');

const server = http.createServer((req, res)=>{
  res.writeHead( 200, { 'Content-Type': 'text/plain; charset=utf-8'});
  res.write('응답 1');
  res.write('응답 2');
  res.end('마지막 응답 / 응답 끝');
})

server.listen(3000, '127.0.0.1', ()=>{
  console.log('서버 동작 중...');
})

