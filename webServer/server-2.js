const mysql = require('mysql2/promise');


const mongoClient =require('mongodb').MongoClient;
const url = 'mongodb+srv://yurim-v:yurim-v@yurim-v.6vzoh.mongodb.net/?retryWrites=true&w=majority&appName=yurim-v';

const express = require('express');
const app = express();

let mydb ;
let connection;

//---------------------------------------------

const bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

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

  //  입력한 데이터를 sql에 저장
  console.log(req.body.title);
  console.log(req.body.content);

  let insertSQL = 'insert into post(title,content,created) values(?,?,NOW())';
  let params = [req.body.title,req.body.content];

  connection.query(insertSQL, params)
    .then((result)=>{
      console.log('데이터 추가 성공');
    })
})

//---------------------------------------------

async function connectDB(){
  try{

    const client = await mongoClient.connect(url)
      
    console.log('몽고DB 연결 완료');
    mydb = client.db('myboard');
  

    connection = await mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '0000',
      database : 'myboard'
    })

    console.log('sql 연결 완료');

    app.listen(3000,()=>{
      console.log('3000포트로 서버 접속 중...');
    })
    

  }catch(err){
    console.error(err);
  }
}

connectDB();