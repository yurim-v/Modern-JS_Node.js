// 2024.06.15

// 짝수 홀수 구분하기

const readline = require('readline');

const readInterface = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

readInterface.question('숫자를 입력해 주세요. : ', function(answer){

  evenOdd(answer);
  readInterface.close();
})


//-------------

function evenOdd(num){
  if(num%2 === 0){
    console.log('짝수 입니다.');
  }
  else if(num%2 > 0){ 
    console.log('홀수 입니다.')
  }
  else{
    console.log('숫자를 입력하지 않았습니다.')
  }
}

/*
조건 연산자로 간단하게 if문 대체해보기

function evenOdd(num){
  var msg = (num%2 == 0)? '짝수입니다.' : "홀수입니다."
  console.log(msg)
}

*/