const express = require('express');
const app = express();

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://yurim-v:yurim-v@yurim-v.6vzoh.mongodb.net/?retryWrites=true&w=majority&appName=yurim-v';

let mydb;

app.get('/',(req,res)=>{
  res.status = 200;
  res.set('Content-Type','text/plain; charset=utf8');

  res.send('홈 화면입니다.')
})


// list가 추가된 도메인에 접속할 때에만 데이터 조회하기

app.get('/list',(req,res)=>{
  res.status = 200;
  res.set('Content-Type','text/plain; charset=utf8');

  res.send('리스트 화면입니다.');

  mydb.collection('post').find().toArray()
  .then((result)=>{
    console.log(result);
  })
})

mongoClient.connect(url)
  .then((client)=>{
    console.log('몽고DB 접속 완료')

    mydb = client.db('myboard');
    // mydb.collection('post').find().toArray()
    //   .then((result)=>{
    //     console.log(result);
    //   })

      app.listen(3000,()=>{
        console.log('port 3000으로 접속 중...');
      })
  })
