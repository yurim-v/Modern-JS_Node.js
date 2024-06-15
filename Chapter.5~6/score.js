// 2024.06.15

let readline = require("readline");

let readInt = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

readInt.question('점수를 입력해 주세요 :  ', function(data){
  score(data);
  readInt.close();
})

//--------

function score(num){
  ;
  if(isNaN(num)){
    console.log('숫자를 입력하지 않았습니다.');
  }
  else if(num >= 90){
    console.log('장학생입니다.');
  }
  else if(num >60){
    console.log('합격입니다.');
  }
  else if(num > 0){
    console.log('불합격 입니다.');
  }
  else{
    console.log('유효한 숫자가 아닙니다.');
  }
}