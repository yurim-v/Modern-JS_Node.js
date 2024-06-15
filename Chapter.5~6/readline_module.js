// 2024.06.15

// 1. 입력받을 수 있는 readline 모듈 불러오기
const readline = require('readline');

// 2. 입력과 출력에 대한 인터페이스 생성하기
const readInterface = readline.createInterface({
  input : process.stdin,
  output : process.stdout
  // ㄴ 터미널을 통해서 입력, 출력 처리
});

// 3. 개발자에게 생성한 인터페이스를 보여주고, 입력을 어떻게 처리할 건지 정의하기
readInterface.question('당신의 이름은?  ', function(answer){
  // 입력 처리
  console.log(`이름 : ${answer}`);

  // 더 이상 입력을 받을 수 없게 인터페이스 종료
  readInterface.close();
})