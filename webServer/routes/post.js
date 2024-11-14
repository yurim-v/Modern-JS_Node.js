
let router = require('express').Router();

const mongoClient =require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;
const url = process.env.DB_URL;

let mydb;
mongoClient.connect(url)
 .then(client=>{
  mydb = client.db("myboard");
  console.log('router : 몽고DB 연결 완료');
 })


router.get("/list",(req,res)=>{

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

module.exports = router ;

