// 2024.06.23

const fruit = {
  apple : '사과',
  grape : '포도',
  orange : '오렌지'
}

// 이미 정의된 객체 -> 속성 추가/수정/삭제 가능.

// 1. 추가
fruit.mango = '망고';
console.log(fruit);

// 2. 수정
fruit.apple = '아오리 사과';
console.log(fruit);

// 3. 삭제
delete fruit.grape;
console.log(fruit);


//------------------------------------------------------------
// 대괄호 표현법

console.log(fruit['mango']);


//------------------------------------------------------------
// 간단한 응용 -> 대괄호 표현법으로 사용자에게 key를 입력받아 value 출력할 수 있다.



// 계산된 프로퍼티
const readline = require('readline');

const interFace = readline.createInterface({
  input : process.stdin , 
  output : process.stdout
})

interFace.question('과일의 영어 스펠링 입력세요 :  ', function(data){
  console.log(fruit[data]);

  let search = {
    [data] : '1개 당 1,000원'
  }
  console.log(search[data]);

  interFace.close();
})
/*
  객체의 key를 자바스크립트 표현식으로 나타내어 정의할 때,
  [ ] 대괄호를 사용하여 나타낸다.

  대괄호 [ ]의 역할은 템플릿 리터럴 표현식의 ${ }와 같은 역할이다.
*/


//------------------------------------------------------------

// 단축 프로퍼티 : key와 value 값이 같을 경우, 단축하여 나타낼 수 있다.

let dog = '강아지';
let cat = '고양이';

let animals = {
  dog ,
  cat 
}
/*
  dog, cat으로 key와 value의 이름이 같을 때에는 단축하여 위의 코드처럼 표현 가능 
  let animals = {
    dog : dog,
    cat : cat
  }
*/
console.log(animals);



