
/*

// promise 이용해서 코드 작성

  let mysql = require('mysql2/promise');

  async function getData(){
    try{
      let connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '0000',
        database : 'myboard'
      })

      await connection.query('select * from todolist')
        .then(([rows,field])=>{
          console.log(rows);
        })
        .catch((error)=>{
          console.log('에러 처리 완료');
        })
        .finally(()=>{
          if(connection){
            console.log('연결 종료');
            connection.end();
          }
        })    
    }catch(err){
      console.log(err);
    }
  }

  getData();

*/



// 동기화 시켜서 코드 작성

let mysql = require('mysql2/promise');

async function getData(){
  let connection;
  try{
     connection = await mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '0000',
      database : 'myboard'
    })

    let [rows,fields] = await connection.query('select * from todolist');
    console.log(rows);

   
  }catch(err){
    console.log(err);
    
  }finally{
    if(connection){
      console.log('마무리 작업');
      connection.end();
    }
  }
}

getData();

