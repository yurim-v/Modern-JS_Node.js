// 2024.06.08

// 자료형이 다른 값의 연산


/*
parseInt : 문자열의 시작부터 숫자로 변환 가능한 부분이 있는지 탐색 
+ 연산자 : 문자열 전체를 숫자로 변환
*/


let c = +"1"; // 입력되는 데이터 : 문자열 -> 숫자 입력되어도 문자열
let d = parseInt("1");

console.log(c);
console.log(typeof c);
console.log(4 + c);

console.log(d);
console.log(typeof d);
console.log(4 + d);


console.log(parseInt("  123  ")); // 123
console.log(parseInt("  123  456")); // 123
console.log(parseInt("123abc")); // 123
console.log(parseInt("abc123")); // NaN

console.log(+"  123  "); // 123
console.log(+"  123  456"); // NaN (숫자가 아닌 문자열로 인식)
console.log(+"123abc"); // NaN
console.log(+"abc123"); // NaN

console.log(+ true); // 1 출력
console.log(+ false); // 0 출력

console.log( - "1234"); // - 연산자도 데이터를 숫자형으로 변환 -> 음수로 변환함


//----------------------------------------

// + 외의 다른 연산자는 문자열은 숫자 데이터를 숫자형으로 자동 변환하여 연산
console.log('45'-5);
console.log('8' * 9)
console.log('8' / 4);
console.log('45'% 8);