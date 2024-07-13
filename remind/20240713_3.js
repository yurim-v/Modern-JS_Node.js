// express모듈

const express = require('express');
const app = express(); // 서버 생성됨

app.listen(3000, ()=>{
  console.log('서버 동작중..');
})

app.get('/', (req,res)=>{
  res.set('Content-Type','text/html; charset=utf-8');
  res.send('응답 데이터 : 홈 화면입니다.');
})

app.get('/main', (req,res)=>{
  res.set('Content-Type','text/html; charset=utf-8');
  res.sendFile(__dirname + '/main.html');
})

