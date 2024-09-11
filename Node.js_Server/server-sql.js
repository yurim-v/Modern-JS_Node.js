
// MySQL 연동 코드
let mysql = require('mysql2');

// MySQL 접속 및 연동을 위한 설정
let conn = mysql.createConnection({
  host:'localhost',
  user : 'root',
  password : '0000',
  database : 'myboard'
})

// MySLQ 연결
conn.connect();


//-------------------------------

/*
conn.query('select * from todolist',(err,rows,fields)=>{
  if(err) throw err;

  console.log(rows);
  console.log(fields);
})
*/


//----------------------------------

let express = require('express');
let app = express();

app.listen(3000,()=>{
  console.log('서버 접속 중...');
})


app.get('/',(req,res)=>{
  res.set('Content-Type','text/plain; charset=uft8');
  res.send('홈화면입니다.')
})

//----------------------------------


/*
 서버가 연결됨과 동시에 데이터를 조회하는 것이 아닌,
  데이터 조회 요청이 있을 때 데이터를 조회하겠다.
*/

app.get('/list',(req,res)=>{
  console.log('데이터베이스를 조회합니다.')
  res.send('데이터 조회중 ')

  conn.query('select * from todolist',(err,rows,fields)=>{
    if(err) throw err;
  
    console.log(rows);
    console.log(fields);
  })

})