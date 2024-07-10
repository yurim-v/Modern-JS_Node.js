// 2024.07.10

const express = require('express');

const app = express();

app.listen(8080, ()=>{
  console.log('port 8080으로 서버 대기 중...');
})


app.get('/', (req,res)=>{
  res.send(
    `<html>
      <body>
        <h1>홈 입니다.</h1>
        <p>사용자님, 반갑습니다.</p>
      </body>
    </html>`
  );
})

app.get('/book', (req,res)=>{
  res.sendFile(__dirname + '/server_index.html');
})
