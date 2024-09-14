// 서버를 만드는 방법 : express

let express = require('express');

let app = express();

app.get('/', (req,res)=>{
  res.set("Content-Type","text/plain; charset=utf8");
  res.send('홈화면입니다.');
  
  // res.sendFile(__dirname + "/파일명")
})

app.listen('3000',()=>{
  console.log('서버 접속~')
})