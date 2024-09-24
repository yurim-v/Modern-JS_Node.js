
const express = require('express');
const app = express();
app.set('view engine','ejs');

const objectID = require('mongodb').ObjectId;

const mysql = require('mysql2/promise');
let connection ;

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://yurim-v:yurim-v@yurim-v.6vzoh.mongodb.net/?retryWrites=true&w=majority&appName=yurim-v';
let mydb ;

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended : true}));

//-----------------------------------------

app.get('/enter',(req,res)=>{
  res.sendFile(__dirname + '/review-1.html');
})

app.post('/save',(req,res)=>{
  console.log(req.body);

  let param = [req.body.title, req.body.content, req.body.date];

  /*
    // sql에 저장
    connection.query('insert into post(title,content,created) values(?,?,?)',param)
      .then(result=>{
        console.log('데이터 저장 완료');
      })
      .catch(err=>{
        console.error(err);
      })
  */
  

  // 몽고 db에 저장
  mydb.collection('post').insertOne({
    title : req.body.title,
    content : req.body.content,
    date : req.body.date})
    .then(result=>{
      console.log('데이터 저장 완료');
    })
    .catch(err=>{
      console.error(err);
    })
})


app.get('/list',(req,res)=>{
  /*
    // sql 데이터 삽입하기

    connection.query('select * from post')
      .then((result)=>{
        console.log(result);

        res.render('review-1.ejs',{data : result[0]});
      })
  */

    mydb.collection('post').find().toArray()
      .then(result=>{
       console.log(result);
        res.render('review-1.ejs',{data : result});
      })

  })


app.post('/delete',(req,res)=>{
  req.body._id = new objectID(req.body._id);
  console.log(req.body);

  mydb.collection('post').deleteOne(req.body)
   .then(result=>{
      console.log('삭제 완료');
     res.status(200).send('성공');
    })
})

//-----------------------------------------

async function connectDB(){
  try{
     connection = await mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '0000',
      database : 'myboard'
    })

    console.log('mysql 연결 완료');

    const client = await mongoClient.connect(url);
    mydb = client.db('myboard');

    console.log('몽고DB 연결 완료 ');

    app.listen(3030, '127.0.0.1', ()=>{
      console.log('3030 포트로 접속 중...');
    })


  }catch(err){
    console.error(err);
  }
}
connectDB();