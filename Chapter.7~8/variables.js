// 2024.06.22

// var : 함수 스코프 

function callName(){
  var name = '김애숙';
  console.log(name);
}

callName(); // 함수 내에서는 변수 접근 가능
console.log(name); // 함수 외부에서는 접근 불가

//------------------------------

// let : 블록 스코프 

for(let i = 1; i<3; i+=1){
  console.log(i);
}

console.log(i); // 블록 밖에서 변수 접근 불가

//------------------------------

// 함수가 아닌 구문에서의 var : 전역 스코프

console.log(a);

for(var a = 1; a<3; a+=1){
  console.log( `a 값 : ${a}`);
}

console.log(a);


