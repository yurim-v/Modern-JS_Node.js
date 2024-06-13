// 2024.06.12

// 논리 연산자
console.log(false && 'a'); //false
console.log(true || 'a'); //true

console.log('a' && true); // true -> 둘 다 false가 아닐 때, 가장 오른쪽 값 반환
console.log('a'  || true); //a -> 먼저 true로 판정된 값 반환

console.log( 'a' && 'b'); //b
console.log( 'a' || 'c'); //a  -> 먼저 true로 판정된 값 반환

console.log(null && false); // null -> false가 아닌 null반환
console.log(null || true); // true 
console.log(null || false); // false -> null을 false로 판단 -> null이 아닌 false반환