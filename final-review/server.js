// 환경 변수
const dotenv = require('dotenv').config();

const express = require('express');
const app = express();

const mysql = require('mysql2/promise');
let sqlDB ;

const mongoClient = require('mongodb').MongoClient ;
const objID = require('mongodb').ObjectId ;
const url = process.env.MONGO_URL;
let mongoDB ; 

//-----------------------------------------

// 요청데이터에 접근할 수 있는 미들웨어 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser('signedCookieMeRongMeRong'));

const session = require('express-session');
app.use(session({
  secret : 'dkfdkfksdlghld',
  resave : false,
  saveUninitialized : true
}))

// 암호화하는 알고리즘 / 단방향으로 복호화 불가
const sha = require('sha256');

// 정적 파일 미들웨어 
app.use(express.static('public'));

// 파일 업로드를 처리하는 미들웨어
const multer = require('multer');
const storage = multer.diskStorage({
  destination : (req, file, done)=>{
    done( null, './public/pictures');
  },
  filename : (req, file, done)=>{
    done(null, file.originalname);
  }
})
let upload = multer({storage : storage});

// 인증 기능을 구현하는 미들웨어
const passport = require('passport');
let LocalStrategy = require('passport-local').Strategy ; 
app.use(passport.initialize());
app.use(passport.session());

// 템플릿 엔진 적용
app.set('view engine','ejs');

//-----------------------------------------

// 라우터 분리
app.use('/write',require('./routes/post.js'));
app.use('/login',require('./routes/login.js'));
app.use('/search',require('./routes/search.js'));


//-----------------------------------------

app.get('/',(req,res)=>{
  res.render('home.ejs');
})

//-----------------------------------------

async function connectDB(){
  try{
    sqlDB =  await mysql.createConnection({
      host : process.env.SQL_HOST,
      user : process.env.SQL_USER,
      password : process.env.SQL_PASSWORD,
      database : process.env.SQL_DATABASE
    });
    console.log('MySQL 연결 완료');

    let client = await mongoClient.connect(url);
    mydb = client.db('myboard');
    console.log('몽고 연결 완료');

    app.listen(process.env.PORT, process.env.USER_IP,()=>{
      console.log('포트 접속 중...');
    })
  }catch(err){
    console.error(err);
  }
};
connectDB();