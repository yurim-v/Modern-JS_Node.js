// 2024.06.08

console.log(v);   // undefined
console.log(x);  // ReferenceError: Cannot access 'x' before initialization

var v = 10;
let x = '가';

/*
console.log(v) -> undefined -> 변수 v가 정의는 됐으나, 값이 지정되지 않은 상태 -> 호이스팅 O
console.lofg(x); -> 에러 발생 : ReferenceError: Cannot access 'x' before initialization -> 변수 x 정의되지 않음 -> 호이스팅 X 
*/

//--------------------------------------------------------------

if(1>0){
  var a = 10;
}

if(1>0){
  let b = 20;
}

console.log(a); // 10 출력
console.log(b); // 에러 발생 -> ReferenceError: b is not defined
/* 
var : 변수가 선언되면 어디에서든지 사용이 가능하다.
let : 변수가 선언된 블록 내에서만 사용이 가능하다. -> if문의 괄호 { } 내부에서만 변수 b 사용 가능 
*/