const mysql = require('mysql2/promise');
let connection ;

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://yurim-v:yurim-v@yurim-v.6vzoh.mongodb.net/?retryWrites=true&w=majority&appName=yurim-v'
let mydb ; 

const objID = require('mongodb').ObjectId;

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : true}));

//-----------------------------------------------

app.get('/enter',(req,res)=>{
  res.status(200);

  res.render('enter.ejs');
})

app.post('/save',(req,res)=>{
  console.log(req.body);

  insertData();
})


app.get('/list',(req,res)=>{

  getData()
   .then(result=>{
    res.render('practice-1.ejs',
      {sqlData : result[0], mongoData : result[1] 
    });
   })
})


app.post('/delete',(req,res)=>{

  delData(req.body.id, req.body._id)
    .then(result=>{
      res.send('성공');
    })

})


//-----------------------------------------------


async function ConnectDB(){
  try{
    connection = await mysql.createConnection({
      host : 'localhost',
      user :'root',
      password : '0000',
      database : 'myboard'
    })

    console.log('mySQL 연결 완료');

    let client = await mongoClient.connect(url);
    mydb = client.db('myboard');

    console.log('몽고DB 연결 완료');

    app.listen(3040,'127.0.0.1',()=>{
      console.log('3040포트 접속 중..');
    })


  }catch(err){
    console.error(err);
  }
}

ConnectDB();

//---------------------------------------------

async function insertData(){  
  
  try{
    let insertQuery = 'insert into post(title,content,date) value(?,?,NOW())'
    let param = [ req.body.title, req.body.content ];
  
    await connection.query(insertQuery, param);
    console.log('SQL - 데이터 추가 완료');
  
  
    await mydb.collection('post').insertOne({
      title : req.body.title,
      content : req.body.content
    })
    console.log('몽고 DB - 데이터 추가 완료');

  }catch(err){
    console.error(err);
  }


}

//---------------------------------------------

async function getData(){
  try{
    let [sqlData, field ] = await connection.query('select * from post');
    console.log('SQL 데이터 조회 완료;');
  
  
    let mongoData = await mydb.collection('post').find().toArray();
    console.log('mongo 데이터 조회 완료 ');
  
    return [sqlData, mongoData];
  }catch(err){
    console.error(err);
  }


}

//---------------------------------------------

async function delData(sqlID, monID){
  try{
    if(sqlID){
      await connection.query('delete from post where id=?',sqlID);
      console.log('SQL 데이터 삭제 완료');
    }else{
      console.log('SQL 데이터 아님');
    }

    if(monID){
      monID = new objID(monID);

      await mydb.collection('post').deleteOne({_id : monID})

      console.log('몽고 데이터 삭제 완료');
    }else{
      console.log('몽고 데이터 아님');
    }
  }catch(err){
    console.error(err);
  }

}