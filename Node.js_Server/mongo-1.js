
// 기본 형식


let express = require('express');
let app = express();

app.get('/',(req,res)=>{
  res.set('Content-Type',"text/plain; charset=utf8");
  res.send('홈 화면입니다.');
})

//--------------------------------------------

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://yurim-v:yurim-v@yurim-v.6vzoh.mongodb.net/?retryWrites=true&w=majority&appName=yurim-v';

let mydb;

mongoClient.connect(url)
  .then(client=>{
    console.log('몽고 DB 접속 완료');

    mydb = client.db('myboard');
    mydb.collection('post').find().toArray()
      .then((result=>{
        console.log(result);
      }))

    app.listen(3000,()=>{
      console.log('서버 접속 중...');
    })
  })
  .catch((err)=>{
    console.error(err);
  })



