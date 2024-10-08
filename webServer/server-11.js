
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

const session = require('express-session');
app.use(session({
  secret : 'afljdfkldmldsfjs',
  resave : false,
  saveUninitialized : true
}))

app.get('/session',(req,res)=>{
  if(isNaN(req.session.milk)){
    req.session.milk = 0;
  }

  req.session.milk = req.session.milk + 1000;
  res.send('session : ' + req.session.milk + '원');
})


//---------------------------------------------

const cookieParser = require('cookie-parser');
app.use(cookieParser('kadladksaw12491jkfda'));

app.get('/cookie',(req,res)=>{
  let milk = parseInt(req.signedCookies.milk) + 1000;

  if(isNaN(milk)){
    milk = 0;
  }

  res.cookie('milk', milk, {signed : true } );
  res.send('prduct : ' + milk + '원');

})


//---------------------------------------------

app.get('/',(req,res)=>{
  res.status(200);
  res.set('Content-type','text/html; charset=utf8');

  res.render('home.ejs');
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


app.get('/content/:id',(req,res)=>{

  console.log( req.params.id);
  console.log(req.params);

  req.params.id = new ObjId(req.params.id);

  mydb.collection('post')
   .findOne({_id : req.params.id})
   .then((result)=>{
    res.render('content.ejs',{data : result });
   })
})


app.get('/edit/:id',(req,res)=>{

  req.params.id = new ObjId(req.params.id);

  mydb.collection('post')
  .findOne({_id : req.params.id})
  .then((result)=>{
   res.render('edit.ejs',{data : result });
  })
})

app.post('/update/:id',(req,res)=>{

  req.params.id = new ObjId(req.params.id);

  mydb.collection('post')
   .updateOne(
    {_id : req.params.id},
    {
      $set : {
        title : req.body.title,
        content : req.body.content,
        date : req.body.date
      }
    }
   )
   .then(result=>{
    console.log('데이터 수정 완료');

    res.redirect('/list');
   })

})

//---------------------------------------------

app.get('/login',(req,res)=>{
  console.log('로그인 페이지 접속');

  console.log(req.session);
  console.log(req.session.user);

  if(req.session.user){
    console.log('세션 유지')
    console.log('로그인 성공');
    res.render('index.ejs',{user : req.session.user});
  }else{
    res.render('login.ejs');
  }
})

app.post('/login',(req,res)=>{
  console.log('아이디 : ' + req.body.userid);
  console.log('비밀번호 : ' + req.body.userpw);

  mydb.collection('account')
   .findOne({userid : req.body.userid})
   .then(result=>{
    if(result === null){
      res.send('id가 존재하지 않습니다.');
    }else if(result.userpw === req.body.userpw){
      req.session.user = req.body
      console.log('로그인 세션 생성');
      res.render('index.ejs',{user : req.session.user});
    }else{
      res.send('비밀번호가 일치하지 않습니다.')
    }
   })
})
//---------------------------------------------

app.get('/logout',(req,res)=>{
  console.log('로그아웃');

  req.session.destroy((err)=>{
    if(err){
      console.error(err);
    }else{
      console.log('세션 삭제 완료');
      console.log(req.session);
      res.render("index.ejs",{ user:null });
    }

  })
})

//---------------------------------------------

// 회원가입 가능 구현
app.get('/join',(req,res)=>{
  res.render('join.ejs');
})

app.post('/join',(req,res)=>{

  mydb.collection('account')
   .insertOne({
    userid : req.body.userid , 
    userpw : req.body.userpw ,
    usergroup : req.body.usergroup,
    useremail : req.body.useremail
   })
   .then(result=>{
    console.log('회원가입 완료');
    res.redirect('/');
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

    app.listen(3000 ,()=>{
      console.log('3000번 포트로 서버 접속 중...');
    })
    

  }catch(err){
    console.error(err);
  }
}

connectDB();