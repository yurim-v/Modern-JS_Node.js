// 2024.07.09

// http모듈 : 웹 브라우저의 요청을 처리할 수 있는 모듈
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// sercver 생성
const server = http.createServer((req, res)=>{
  // 응답에 대한 status
  res.statusCode = 200;

  // 응답에 대한 header 정보
  res.setHeader('Content-Type', 'text/plain');

  // 응답 데이터
  res.write('Hello Word !'); // 응답 전송만 -> 여러번 전송 가능
  res.end('Bye Word !'); // 응답 전송 후 응답 연결 끊음 -> 더 이상 데이터 전송 불가 
});

// 서버 실행 -> 외부에서 접속 가능하도록 port 오픈
server.listen(port, hostname, ()=>{

  // 서버가 실행되었을 때, console에 출력할 메세지 
  console.log(`Server running at http://${hostname}:${port}/`);
})