const express = require('express');
const mysql = require('mysql2');
const mongoClient = require('mongodb').MongoClient;

const app = express();
const url='mongodb+srv://yurim-v:yurim-v@yurim-v.6vzoh.mongodb.net/?retryWrites=true&w=majority&appName=yurim-v';
let mydb ;

//---------------------------------------------

// 사용자가 요청한 데이터 가져오기

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//---------------------------------------------

app.get('/',(req,res)=>{
  res.status(200);
  res.set('Content-type','text/html; charset=utf8');

  res.send('홈화면 입니다.');
})

app.get('/enter',(req,res)=>{
  res.status(200);
  res.set('Content-type','text/html; charset=utf-8');

  res.sendFile(__dirname + '/enter.html');
})

app.post('/save',(req,res)=>{
  console.log('저장완료');

  console.log(req);
  console.log(req.body);
})

//---------------------------------------------

mongoClient.connect(url)
  .then((client)=>{
    console.log('몽고 DB 접속 완료');
    
    mydb = client.db('myboard');
    
    app.listen(3000,'127.0.0.1',()=>{
      console.log('3000포트로 접속 중...');
    })
    
  })