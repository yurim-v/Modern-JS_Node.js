// 2024.06.08

console.log('가'*3); // NAN 출력 

/*
NaN : Not a Number 이라는 뜻
    ㄴ 숫자 연산 중 오류가 발생했거나, 숫자 연산이 불가할 때 출력된다.
*/

//----------------------------------------

/*
 Object형 데이터 : 여러개의 데이터 및 데이터 유형을 포함하고 있는 자료형
 ㄴ ex ) 배열(Array), 객체(Object)
*/
let obj = new Object();
let arr = new Array();

console.log(obj);
console.log(arr);

let a = {
  name : '객체',
  item : '객체 리터럴 방식'
}
console.log(typeof a);
console.log(a);
