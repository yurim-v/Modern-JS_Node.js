let sql = require('mysql2');

let conn = sql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '0000',
  database : 'remind'
})

conn.connect();

conn.query('select * from tb1', (err,rows,fields)=>{
  console.log(rows);
  console.log(fields);
})

