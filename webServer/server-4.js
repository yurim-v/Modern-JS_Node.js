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

// 템플릿 엔진 설정
app.set('view engine',"ejs");

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

  mydb.collection('post').insertOne(
    {title : req.body.title, content : req.body.content}
  ).then((result)=>{
    console.log('몽고 DB 데이터 추가 완료');
    console.log(result);
  })
})

// 데이터 조회
app.get("/list",(req,res)=>{

  mydb.collection('post').find().toArray()
    .then((result)=>{
      console.log('데이터 조회 완료');
      console.log(result);

      res.render('list.ejs',{data : result});

    })
    .catch((err)=>{
      console.error(err);
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