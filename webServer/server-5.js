const mysql = require('mysql2/promise');


const mongoClient =require('mongodb').MongoClient;

// objID 객체 선언
const ObjId = require('mongodb').ObjectId;

const url = 'mongodb+srv://yurim-v:yurim-v@yurim-v.6vzoh.mongodb.net/?retryWrites=true&w=majority&appName=yurim-v';

const express = require('express');
const app = express();

let mydb ;
let connection;

//---------------------------------------------

const bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

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

  // res.sendFile(__dirname + '/enter.html');
  res.render('enter.ejs')
})

app.post('/save',(req,res)=>{
  console.log('저장완료');

  console.log(req.body.date)

  mydb.collection('post').insertOne(
    {title : req.body.title, content : req.body.content, date : req.body.date}
  ).then((result)=>{
    console.log('몽고 DB 데이터 추가 완료');
    console.log(result);
  })
})

app.get("/list",(req,res)=>{

  mydb.collection('post').find().toArray()
    .then((result)=>{
      console.log('데이터 조회 완료');
      // console.log(result);

      res.render('list.ejs',{data : result});

    })
    .catch((err)=>{
      console.error(err);
    })
})


app.post('/delete',(req,res)=>{

  // ajax가 전달한 data는 서버에 요청 데이터로 전송된다.
  console.log(req.body);

  // 문자열 형태인 id를 몽고DB 아이디 형식인 Object ID 형식으로 변환한다.
  req.body._id = new ObjId(req.body._id);


  mydb.collection('post').deleteOne(req.body)
    .then((result)=>{
      console.log('삭제완료');

      // 데이터 삭제 후 응답으로 상태코드 200을 전송한다.
      res.status(200).send()
    })
    .catch((err)=>{
      res.status(500).send();
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