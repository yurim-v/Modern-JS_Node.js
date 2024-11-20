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
// app.use('/write',require('./routes/post.js'));
// app.use('/login',require('./routes/login.js'));
// app.use('/search',require('./routes/search.js'));


//-----------[ 로그인 관련 ]------------------

app.get('/',(req,res)=>{
  if(req.session.passport){
    res.render('home.ejs',{data : req.session.passport.user});
  }else{
    res.render('home.ejs',{data : null});
  }
})

app.get('/login',(req,res)=>{
  console.log('로그인 화면 접속');
  if(req.session.passport){
    res.redirect('/')
  }else{
    res.render('login.ejs');
  }
})

app.post('/login',passport.authenticate('local',{
  failureRedirect : '/'
})
  ,(req,res)=>{
    console.log(req.session);
    res.redirect('/')
})

passport.use(
  new LocalStrategy({
    usernameField : "userId",
    passwordField : "userPw",
    session : true,
    passReqToCallBack : false
  },(userid, userpw, done)=>{
    mydb.collection('account').findOne({userid : userid})
     .then(result=>{
      console.log(result);
      if(result === null){
        console.log('아이디가 존재하지 않습니다.');
        done(null, false, {messege:'아이디 존재하지 않음'});
      }else if(result.userpw !== sha(userpw)){
        console.log('비밀번호가 일치하지 않습니다.');
        done(null, false, {messege:'비밀번호 불일치'});
      }else{ 
        console.log('로그인 성공');
        done(null, result.userid);
      }
     })
  })
)

passport.serializeUser((user,done)=>{
  console.log('serializeUser : '+user);
  done(null,user);
})

passport.deserializeUser((loginUser,done)=>{
  console.log("deserializeUser : "+loginUser);
  mydb.collection('account').findOne({userid : loginUser})
   .then(result=>{
    if(result){
      console.log('deserialize : 재인증 성공');
      done(null, loginUser);
    }
   })
})

app.post('/logout',(req,res)=>{
  console.log(req.session.passport);
  console.log(req.signedCookies);
  req.session.destroy();
  res.clearCookie('connect.sid');
  console.log('로그아웃 완료');
  res.status(200).send();

})

app.get('/join',(req,res)=>{
  console.log('회원가입 화면 접속');
  res.render('join.ejs');
})

app.post('/join',(req,res)=>{
  console.log(req.body);
  mydb.collection('account').insertOne({
    userid : req.body.joinId,
    userpw : sha(req.body.joinPw),
    useremail : req.body.joinEmail
  }).then(()=>{
    console.log('회원가입 완료');
    res.redirect('/');
  })
})


//-----------[ 게시글 관련 ]------------------

app.get('/write',(req,res)=>{
  console.log('write 페이지 접속');
  res.render('write.ejs');
})

app.post('/write',upload.single('photo'), (req,res)=>{
  console.log(req.body);
  console.log(req.file.path);
  mydb.collection('post').insertOne({
    title : req.body.title,
    content : req.body.content,
    date : req.body.date,
    imagePath : "\\" + req.file.path
  }).then(result=>{
    console.log('데이터 저장 완료');
    res.redirect('/list');
  })
})

app.get('/list',(req,res)=>{
  console.log('상세페이지 접속');
  mydb.collection('post').find().toArray()
    .then(result=>{
      res.render('list.ejs',{data : result});
    })
})

app.get('/content/:id',(req,res)=>{
  mydb.collection('post').findOne({
    _id : new objID(req.params.id)
  }).then(result=>{
    console.log('content 조회 완료');
    res.render('content.ejs',{ data : result});
  })
})

app.get('/edit/:id',(req,res)=>{
  mydb.collection('post').findOne({
    _id : new objID(req.params.id)
  }).then(result=>{
    console.log('수정 페이지 로드 완료');
    res.render('edit.ejs',{data: result});
  })
})

app.post('/edit/:id',(req,res)=>{
  mydb.collection('post').updateOne({_id:new objID(req.params.id)},
  {$set : {
    title : req.body.title,
    content:req.body.content,
    date : req.body.date
  }}).then(result=>{
    console.log('데이터 수정 완료');
    res.redirect('/list');
  })
})

app.post('/delete',(req,res)=>{
  console.log(req.body);
  mydb.collection('post').deleteOne({
    _id : new objID(req.body.id)
  }).then(result=>{
    console.log('데이터 삭제 완료');
    res.status(200).send();
  })
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