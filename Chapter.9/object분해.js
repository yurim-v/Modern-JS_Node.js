// 2024.06.29

let aesook = {
  name : '애숙',
  birth : '2005년',
  age : '만 17살'
}

// 1. 객체 분해

let {name, birth, age} = aesook;

console.log(name);
console.log(birth);
console.log(age);
  /*
   key의 이름과 같은 변수명으로 정의해야한다.
   다른 이름으로 변수를 정의하려면

   let { name : a, birth : b, age : c} = aesook ; 
   ㄴ  a = '애숙', b = '2005년' , c = '만 17살' 으로 변수를 정의할 수 있다.
  */

//----------------------------

// 2. 변수 개수 > 속성 개수 

let fruit = {
  apple : '사과',
  peach : '복숭아'
}

let { apple, peach, grape = '포도'} = fruit ;
console.log(grape);


// 3. 변수 개수 < 속성 개수

let fruit2 = {
  melon : '메론',
  lemon : '레몬',
  orange : '오렌지',
  pear : '배'
}

let {melon,orange} = fruit2 ;
 // 배열처럼 쉼표와 공백을 통해 요소를 건너뛸 수 없음 -> 필요한 key만 변수로 정의하면 된다.


// 4. 속성 일부만 변수로 저장 / 나머지 속성으로 새로운 객체 형성
let school = {
  univ : '대학교',
  high : '고등학교',
  midd : '중학교',
  elemt : '초등학교',
  kinder : '유치원'
}

let {univ, midd, ...rest} = school;
console.log(rest);

// 5. 객체 결합
let group1 = {
  a : 1,
  b : 2,
  c : 3
}

let group2 = {
  d : 1,
  e : 2,
  f : 3
}

let group3 = {
  ...group1,
  ...group2
}

console.log(group3);