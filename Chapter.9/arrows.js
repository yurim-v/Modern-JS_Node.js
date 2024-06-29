// 2024.06.29

// 1. 함수 선언식
function add_1(a,b){
  console.log(a+b);
}

// 2. 함수 표현식

let add_2 = function(a,b){
  console.log(a+b);
}

//------------------------------

// 3. 화살표 함수

let addArrow = (a,b) => {
  console.log(a+b);
}

addArrow(3,4);

// --------------------------------

// 화살표 함수의 특징

// 1. 함수 내부에 return만 있을 경우 : 중괄호와 return 생략 가능
let onlyReturn_1 = (a,b) => {
  return a+b ;
}

let onlyReturn = (a,b) => a+b ;

// 2. 매개변수가 하나인 경우 : 소괄호 생략 가능
let oneParameter = a => {
  console.log(a+1);
}

  // 매개변수 1개 + return문만 있을 경우
  let return_oneParam = a => a+1 ;

// 3. 매개 변수가 없을 경우 : 소괄호 생략 불가

let noParam = () => {
  console.log('아침이라 졸립당');
}


