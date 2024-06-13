// 2024.06.08

/* 조건부 연산자  ?
 조건식 ? value 1 : value 2
 ㄴ 조건이 true이면 value 1 반환 / false 이면 value 2 반환
*/

let a = 90;
let result = a > 100 ? '조건 true' : "조건 false" ;
console.log(result);

// if 로 표현 하자면 ?
if(a>100){
  let ifResult = '조건 ture';
  console.log(ifResult);
} else{
  ifResult = '조건 false'
  console.log(ifResult);
}


//--------------------------------------------------------------

// 논리연산자

console.log(true && true); // true
console.log(true && false); // false

console.log(true || true); // true
console.log(true || false); // true
console.log(false || false); // false

console.log( !true); // false

// 응용

let id = '김유림';
let password = '1234';

let logIn = (id =='김유림' && password == '1234') ? '로그인 성공' : '아이디 비밀번호 틀림'
console.log(logIn);