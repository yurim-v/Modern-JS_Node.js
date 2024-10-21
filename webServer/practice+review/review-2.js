// 1. 변수 선언

const express = require('express');
const app = express();

const mysql = require('mysql2/promise');
let sqlDB ;

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://yurim-v:yurim-v@yurim-v.6vzoh.mongodb.net/?retryWrites=true&w=majority&appName=yurim-v';
let mongoDB ;

//-----------------------

// 2. 미들웨어 / 라이브러리

const bodyParser = require('body-parser');
const e = require('express');
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const sha = require('sha256');

const session = require('express-session');
app.use(session({
  secret : 'dnaklfjidflasd',
  resave : false,
  saveUninitialized : true
}))

// passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());
//------------------------------

// 3. 서버 및 DB 연결 함수

async function connectDB(){
  try{  
    // MySQL 연결
    sqlDB =  await mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '0000',
      database : 'myboard'
    })
    console.log('MySQL 연결 완료');

    // MongoDB 연결
    let client =  await mongoClient.connect(url);
    mongoDB = client.db('myboard');
    console.log('mongoDB 연결 완료');

    // 서버 연결
    app.listen('1018', '127.0.0.1',()=>{
      console.log('1018 포트 접속 중...');
    })

  }catch(err){
    console.error(err);
  }
}

//------------------------------
// 4. 라우터 설계

app.get('/',(req,res)=>{
  console.log('홈 화면 접속');
  console.log(req.session.passport);
  res.render('review-home.ejs',{ user : req.session.passport });
})

// a. DB 데이터 추가
app.get('/write',(req,res)=>{
  res.render('review-write.ejs');
  console.log('입력 화면 접속');
})

app.post('/write',(req,res)=>{
  console.log(req.body);

  // SQL 저장 
  let params = [req.body.title, req.body.content, req.body.date];
  sqlDB.query('insert into review(title,content,date) values(?,?,?)',params)
   .then(result=>{
    console.log('MySQL 데이터 저장 완료');
   })
   .catch(err=>{
    console.error(err);
   })

  // 몽고DB 저장
  mongoDB.collection('post').insertOne({
    title : params[0],
    content : params[1],
    date : params[2]
  }).then(result=>{
    console.log('몽고 DB 데이터 추가 완료');
  }).catch(err=>{
    console.error(err);
   })

  res.redirect('/')
})

//-----------

// b. 데이터 조회 - 게시판
app.get('/board',(req,res)=>{

  //sql 데이터 조회
  sqlDB.query('select * from review')
   .then(([rows,fields])=>{
    console.log('board 접속')
    console.log(rows);

    res.render('review-list.ejs', {data : rows});
   })
   .catch(err=>{
    console.error(err);
   })
})

//-----------

// c. 데이터 조회 - 상세
app.get('/content/:id',(req,res)=>{
  console.log(req.params);

  sqlDB.query('select * from review where id='+req.params.id)
   .then(([rows])=>{
    console.log(rows[0]);

    res.render('review-content.ejs', {data : rows[0]});
   })
})

//-----------

// d. 데이터 수정
app.get('/edit/:id',(req,res)=>{
  sqlDB.query('select * from review where id='+req.params.id)
  .then(([rows])=>{
   console.log(rows[0]);

   res.render('review-edit.ejs', {data : rows[0]});
  })
})

app.post('/edit/:id',(req,res)=>{
  console.log(req.params.id);

  let upParams = [
    req.body.title, req.body.content, req.body.date, req.params.id
  ]
  sqlDB.query('update review set title=?, content=?, date=? where id=?',upParams)
   .then(result=>{
    console.log('MySQL 데이터 수정 완료');
    res.redirect('/board');
   })
})

//-----------

// e. 데이터 삭제
app.post('/delete',(req,res)=>{
  console.log(req.body);

  sqlDB.query('delete from review where id='+req.body.id)
   .then((result)=>{
    console.log('MySQL 데이터 삭제 완료');
    res.status(200).send();
   })
})

//-----------

// f. 회원 가입 구현
app.get('/join',(req,res)=>{
  res.render('review-join.ejs');
  console.log('가입 페이지 접속');
})

app.post('/join',(req,res)=>{

  let account_query = 'insert into account(userid, userpassword, email) values(?,?,?)'
  let account_params = [req.body.userID, sha(req.body.userPass), req.body.userEmail];
  sqlDB.query( account_query, account_params)
   .then(result=>{
    console.log(' account 추가 완료');
    res.redirect('/');
   })
})

//-----------

// g. 로그인 구현
app.get('/login',(req,res)=>{
  if(req.session.passport){
    console.log(req.session.passport);
    console.log('세션 확인 / 로그인 성공');
    res.render('review-home.ejs',{ user : req.session.passport });
  }else{
    console.log('로그인 페이지 접속')
    res.render('review-login.ejs');
  }

})

/*
  app.post('/login',(req,res)=>{
    let logId = req.body.userID;
    let logPass = req.body.userPass;
    
    sqlDB.query(`select * from account where userid='${logId}'` )
    .then(([rows,fields])=>{
      console.log(rows);
      if(rows.length === 0){
        console.log('아이디 불일치');
        res.send('아이디가 존재하지 않습니다.');
      }else if(rows[0].userpassword === sha(logPass)){
        console.log('로그인 성공');
        // res.cookie("userid" , logId);
        // console.log('쿠키생성');

        req.session.user = req.body;

        res.redirect('/');
      }else{
        console.log(rows);
        console.log('비밀번호 불일치');
        res.send('비밀번호가 일치하지 않습니다.');
      }
    })
  })
*/

// passport 적용
app.post('/login',passport.authenticate('local',{
  failureRedirect : '/'
}),
(req,res)=>{
  res.render('review-home.ejs',{ user : req.session.passport });
})

passport.use(
  new LocalStrategy({
    usernameField : 'userID',
    passwordField : 'userPass',
    session : true,
    passReqToCallback : false
  }
 ,(inputid, inputpw, done)=>{
  sqlDB.query(`select * from account where userid='${inputid}'`)
   .then(([rows,field])=>{
      console.log(rows);
      if(rows.length == 0){
        console.log('아이디가 존재하지 않습니다.');
        done(null, false, {messege : '아이디 존재하지 않음'});
      }else if(sha(inputpw) == rows[0].userpassword){
        console.log('로그인 성공');
        done(null, rows[0]);
      }else{
        console.log('비밀번호 불일치');
        done(null, false, {messege : '비밀번호 불일치'});
      }
    })
}))

passport.serializeUser((user, done)=>{
  done(null,user.userid);
})

passport.deserializeUser((puserid,done)=>{
  sqlDB.query(`select * from account where userid='${puserid}'`)
   .then(([rows,field])=>{
      console.log('deserialize : ' + rows[0].userid);
      if(puserid == rows[0].userid){
        console.log('세션 유지');
        done(null, rows[0].userid)
      }
   })
})   
//-----------

// h. 로그아웃 구현
app.post('/logout',(req,res)=>{
  console.log(req.session.user);

  // res.clearCookie('userid');
  req.session.destroy(err=>{
    if(err){
      console.error(err);
    }else{
      console.log('세션 삭제/로그아웃');
      res.status(200).send();    }
  })
})


//------------------------------
connectDB();