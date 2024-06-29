// 2024.06.22

let food = ['떡볶이', '피자', '삼겹살', '김치찌개'];

// 1. 배열 분해
  // ㄴ 배열 요소를 변수에 일괄 저장할 수 있다.

  let [a,b,c,d] = food ;

  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);

  // ㄴ변수 변경 : 왼쪽 변수에 오른쪽 변수 값 대입

  [c,b,a,d] = [a,b,c,d];
  console.log(a);

// --------------------------------------------

// 2. 배열 기본값 설정 : 변수의 개수 > 배열 요소의 개수

  let color = ['red' , 'green', 'yellow'];

  let [r , g , y, p] = color ;

  console.log(p); // undefined 출력

  [r, g, y, p = 'purple'] = color ; // 변수 기본 값 설정
  console.log(p); 

// --------------------------------------------

// 3. 일부 배열 요소 무시 : 변수의 개수 < 배열 요소의 개수
  let seoul = ['구로구', '금천구', '관악구','서초구', '영등포구', '마포구'];

  let [rg1, rg2, ,rg4, , rg6] = seoul ;

  console.log(rg1);
  console.log(rg2);
  console.log(rg4);
  console.log(rg6);

// --------------------------------------------

// 4. 배열의 일부만 변수로 저장 / 나머지 요소로 새로운 배열 형성

  let sanrio = ['폼폼푸린', '포챠코', '쿠로미', '시나모롤', '마이멜로디','헬로키티'];

  let [purin, pochaco, ...rest] = sanrio ;

  console.log(...rest); // 스프레드 방법 -> 배열 요소 복사
  console.log(rest); // 새로운 배열 형성됨

  /* 스프레드 연산자 : ...
    요소를 펼쳐서 복사할 때, 사용된다.

    ex)
    let num = [1,2,3,4];
    console.log(...num) -> 1 2 3 4 로 출력 -> 스프레드 연산자는 요소를 펼치는 데에 사용된다 -> ... 만으로 새로운 배열이 형성되지 않음

    스프레드 연산자가 [ ] 즉, 배열 연산 내에 들어갈 경우, 요소를 복사하여 새로운 배열을 형성한다.
    
    console.log([...num]) -> [ 1 2 3 4 ] 이렇게 출력되는 것이 아니라, [ 1,2,3,4] 로 배열 형식으로 출력된다.
  */

// --------------------------------------------

// 5. 배열끼리 결합
let arr_1 = [1,2,3];
let arr_2 = [4,5,6,7];

let allArray = [...arr_1, ...arr_2];

console.log(allArray);