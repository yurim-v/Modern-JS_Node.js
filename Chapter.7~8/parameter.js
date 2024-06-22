// 2024.06.22

// 매개변수 값 예외 처리 > 기본 값 지정하는 방법 2가지 

let userName = '김애숙'
let Pw = 123;

function logIn( userId, userPw /* 방법 1 : userPw = 111 */){
  if(userId == userName){
    if(userPw == Pw){
      console.log(userPw);
      console.log('로그인 성공');
    }
    else if(userPw === undefined){
      // 방법 2 :  userPw = userPw || 111

      // 방법 3 :
      userPw = userPw ?? 111;

      //------

      console.log(userPw);
      console.log('userPw 기본 값 대입');
    }
    else{
      console.log('비밀번호가 일치하지 않습니다.');
    }
  }
  else{
    console.log('아이디가 일치하지 않습니다.');
  }
}

logIn('김애숙');