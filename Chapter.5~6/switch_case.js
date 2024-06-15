// 2024.06.15


let readline = require('readline');

let readInt1 = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})

readInt1.question('드라이브를 포맷할까요? ', function(answer){
  format(answer);
  readInt1.close();
})

// 선택 값에 대한 swith-case
function format(msg){
  switch(msg){
    case 'y' :
      console.log('드라이브를 포맷하겠습니다.');
      break;
    case 'n' :
      console.log('포맷을 취소합니다.');
      break;
    default :
    console.log('유효하지 않은 입력입니다.')
    break;
  }
}

// --------------------------------------

let readline = require('readline');

let readInt2 = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})

readInt2.question('점수를 입력해 주세요. ', function(answer){
  grade(answer);
  readInt2.close();
})

// 범위에 대한 switch-case
function grade(num){
  switch(Math.round(num/10)){
    case 10:
    case 9:
      console.log('A 학점');
      break;
    case 8:
      console.log('B 학점');
      break;
    case 7:
      console.log('C 학점');
      break;
    case 6:
      console.log('D 학점');
      break;
    case 5:
    case 4 :
    case 3:
    case 2:
    case 1:
    case 0 :
      console.log('F 학점');
      break;
    default:
      console.log('유효한 값이 아닙니다.');
      break;
  }
  
  
}