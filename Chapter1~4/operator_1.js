// 2024.06.08

// 증감 연산자

var a = 3;

console.log(++a); // 가장 먼저 1 증가 -> 출력 값 : 3 +1 = 4 출력
console.log(a++); 
/* 코드 제일 마지막에 1증가 -> 콘솔 출력 당시에는 1 증가 전
 -> 4 출력 -> 다음 줄로 넘어가기 직전에 값 증가 */
console.log(a); // 4 + 1 = 5 출력

var b = 5;

console.log(--b); // 4
console.log(b--); // 4
console.log(b); // 3

//-------------------------------------

// 문자열 비교 연산 : 사전에 기재된 순서로 판단 -> 사전에 나중에 나올수록큰 값으로 판단

console.log( 'c' < 'd' ); // true
console.log('가' < '거'); // true
console.log('가' < '나'); // true
console.log('가나' < '간'); // true


// 다른 자료형의 비교 

// 숫자형 vs 문자열 비교
console.log( 1 == "1"); // true -> 데이터 값만 비교
console.log (1 === "1") // false  -> 데이터 값과 자료형 모두 비교
console.log(1 > "10"); // false


// boolean형 vs 문자열 비교
console.log(true == "1"); // true
console.log(true === "1");  // false
