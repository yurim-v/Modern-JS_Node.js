// 서버 만드는 방법 1 : http

let http = require('http');

let server = http.createServer((req,res)=>{
  res.statusCode = '200';
  res.setHeader('Content=Type','text/plain; charset=utf8;');

  // set.writeHead('200','ok', {'Content-Type' : 'text/plain; charset=utf8'})

  res.write('응답 1');
  res.write('응답 2');
  res.end('마지막 응답')
});

/*
  이벤트
  request
  connection
  close
  checkContinue
  upgrade
  clientError
*/

server.listen('3000', ()=>{
  console.log('서버 연결 완료');
} )