//2024.06.15

let dan = 2;

// break와 레이블
outside : while(dan < 10){
  let num = 1;
  while(num < 10){

    if(dan == 6){
      break outside;
      /*
      break는 자기가 속한 반복문만 빠져나갈 수 있다.
      따라서, break만 적으면 num에 대한 반복문만 빠져나갈 수 있고, dan 반복은 다시 실행된다.

      내부 반복문에서 한번에 반복문 전체를 빠져나가려면 레이블을 통해 break 지점을 지정할 수 있다.
      */
    }

    console.log( `${dan} * ${num} = ${dan*num}`)
    num +=1;
  }
  dan +=1;
}


console.log("-------------------------------")


// continue

let dan2 = 1;
while(dan2 < 10){
  dan2 +=1;
  if(dan2 == 6){
    continue;
  }
  let num = 1;
  while(num < 10){



    console.log( `${dan2} * ${num} = ${dan2*num}`)
    num +=1;
  }
}