
const mysql = require('mysql2/promise');


const mongoClient =require('mongodb').MongoClient;

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

app.use(express.static('public'));

//---------------------------------------------

app.get('/',(req,res)=>{
  res.status(200);
  res.set('Content-type','text/html; charset=utf8');

  res.send('홈화면 입니다.');
})

app.get('/enter',(req,res)=>{
  res.status(200);
  res.set('Content-type','text/html; charset=utf-8');

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

    // 요청 처리 후 화면 이동
    res.redirect('/list');
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

  req.body._id = new ObjId(req.body._id);


  mydb.collection('post').deleteOne(req.body)
    .then((result)=>{
      console.log('삭제완료');

      res.status(200).send()
    })
    .catch((err)=>{
      res.status(500).send();
    })
})


// 시맨틱 url 활용
app.get('/content/:id',(req,res)=>{

  console.log(req.params);
  console.log( req.params.id);

  req.params.id = new ObjId(req.params.id);

  mydb
   .collection('post')
   .findOne({_id : req.params.id})
   .then((result)=>{
    console.log(result);
    res.render('content.ejs',{data : result});

   })
})


// 수정 화면 보여주기
app.get('/edit/:id',(req,res)=>{
  console.log(req.params);

  req.params.id = new ObjId(req.params.id);

  mydb.collection('post')
   .findOne({_id : req.params.id })
   .then((result)=>{
    console.log(result);

    res.render('edit.ejs',{data : result});
   })
})

// 데이터 수정 처리
app.post('/update/:id',(req,res)=>{
  console.log(req.params.id);

  req.params.id = new ObjId(req.params.id);

  mydb.collection('post')
   .updateOne(
    {_id : req.params.id},
    {$set : {
      title : req.body.title,
      content : req.body.content,
      date : req.body.date
    }})
    .then(result=>{
      console.log('데이터 수정 완료');
      res.redirect('/list');
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