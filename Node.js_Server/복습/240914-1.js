// 사용자(개발자)에게 입력 받기 

let readline = require('readline');

let interface = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})

interface.question('나이를 입력하시오 : ', (answer)=>{
  console.log(`당신의 나이는 ${answer}살 입니다.`);

  interface.close();
})
